import { EventEmitter, Page } from 'puppeteer-core';

import { appendixPrefixer } from './appendix-prefixer.js';
import { cmd } from './command-handler.js';
import { printText } from './press-keys.js';
import { replaceCharMap } from './replace-char-map.js';
import { replaceGameChatPrefixMap } from './replace-game-chat-prefix-map.js';
import { soundWrapper } from './sound-wrapper.js';
import { textReplacer } from './text-replacer.js';
import { uioHookWrapper } from './uio-hook-wrapper.js';

import type { ConfigOptions } from '../../types/ConfigOptions.js';
import type { Console } from './console.js';
import type { Dictionary } from '../../types/Dictionary.js';

export class SpeechRecognitionEngine {
	private mainWindow;
	private page;

	private pageEmitter = new EventEmitter();

	private _output: string = '';
	private _partialOutput: string = '';
	private partialOutput: string = '';
	private partialOutputMatrix: string[][] = [];
	private outputPrefix: string | null = null;
	private partialOutputIndex: number = 0;
	private stopOutput: boolean = false;
	private stopTimer: any = null;
	private textParserRegex!: RegExp;
	private appConsole;
	private dictionary;
	private config;

	constructor(mainWindow: Electron.BrowserWindow, page: Page, config: ConfigOptions, appConsole: Console, dictionary: Dictionary) {
		this.mainWindow = mainWindow;
		this.page = page;
		this.appConsole = appConsole;
		this.dictionary = dictionary;
		this.config = config;
	}

	async init() {
		uioHookWrapper((event) => {
			if (!event.pressedKeys['escape']) {
				return;
			}
			if (this.stopOutput) {
				return;
			}

			this.appConsole.logJson(this.dictionary.textFeedback.chromeFunctions.speechRecognition.outputStopped);

			this._output = '';
			this._partialOutput = '';
			this.partialOutput = '';
			this.stopOutput = true;
		});

		this.textParserRegex = new RegExp('(' + [...['makró', 'makrók', 'szöveg', 'szövegek'].map((macroPreffix) => `\\${this.config.commands.prefix}\\s${macroPreffix}\\${this.config.commands.splitter}\\s`)].join(')|(') + ')', 'gi');

		await this.initExposeFunctions();
		await this.initSpeechRecognitionEngine(this.config.speechRecognition);

		return this;
	}

	private async initExposeFunctions() {
		this.pageEmitter.on('speech:recognition:info', (info: any) => this.speechRecognitionInfo(info));
		await this.page.exposeFunction('callSpeechRecognitionInfo', (info: any) => this.pageEmitter.emit('speech:recognition:info', info));

		this.pageEmitter.on('speech:recognition:transcript', (transcript: any) => this.speechRecognitionTranscript(transcript));
		await this.page.exposeFunction('callSpeechRecognitionTranscript', (transcript: any) => this.pageEmitter.emit('speech:recognition:transcript', transcript));
	}

	private async initSpeechRecognitionEngine(speechRecognitionOptions: ConfigOptions['speechRecognition']) {
		await this.page.evaluate((speechRecognitionOptions) => {
			window.speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

			Object.assign(window.speechRecognition, {
				continuous: true,
				interimResults: false,
				lang: speechRecognitionOptions.language ?? 'hu-HU',
				maxAlternatives: 1,
				customWordsAndPhrases: speechRecognitionOptions.customWordsAndPhrases ?? [],
			});

			window.speechRecognition.lang;

			window.speechRecognition.addEventListener('result', (event) => {
				const transcript = Array.from(event.results)
					.map((results) => results[0])
					.map((result) => result.transcript)
					.join('');

				window.callSpeechRecognitionTranscript(transcript);
			});

			window.speechRecognition.addEventListener('start', () => {
				if (!window.speechRecognitionRestart) {
					window.callSpeechRecognitionInfo('started');
				}

				window.speechRecognitionRestart = false;
			});

			window.speechRecognition.addEventListener('end', () => {
				if (window.speechRecognitionEnabled) {
					window.speechRecognition.start();
					window.speechRecognitionRestart = true;
					return;
				}

				window.callSpeechRecognitionInfo('stopped');
				window.speechRecognitionRestart = false;
			});
		}, speechRecognitionOptions);
	}

	updateEngine(speechRecognition: ConfigOptions['speechRecognition']) {
		this.initSpeechRecognitionEngine(speechRecognition);
	}

	async start(_outputPrefix: string | null) {
		this.stopOutput = true;
		this._partialOutput = '';
		this.partialOutput = '';
		this.outputPrefix = _outputPrefix ? _outputPrefix + ' ' : '';
		this.partialOutputMatrix = [];
		this.partialOutputIndex = 0;

		clearTimeout(this.stopTimer);

		this.appConsole.debugLog(textReplacer(this.dictionary.textFeedback.chromeFunctions.speechRecognition.start.outputPrefix, _outputPrefix));

		await this.page.evaluate(() => {
			try {
				window.speechRecognition.start();
				window.speechRecognitionEnabled = true;
			} catch (error) {
				console.log(error);
			}
		});
	}

	async stop() {
		this.stopOutput = false;

		await this.page.evaluate(() => {
			try {
				window.speechRecognition.stop();
				window.speechRecognitionEnabled = false;
			} catch (error) {
				console.log(error);
			}
		});
	}

	private speechRecognitionInfo(info: 'started' | 'stopped') {
		soundWrapper();

		clearTimeout(this.stopTimer);
		this.stopTimer = setTimeout(async () => {
			if (info === 'stopped' && !this.stopOutput) {
				let replacedChar = replaceCharMap(this.outputPrefix + this.partialOutput)!;
				let replacedGameChatPrefix = replaceGameChatPrefixMap(replacedChar)!;
				let replacedAppendixPrefix = appendixPrefixer(replacedGameChatPrefix)!;

				if (replacedAppendixPrefix == '') {
					return;
				}

				let isCommand = replacedAppendixPrefix.startsWith(this.config.commands.prefix);

				let isMacro = replacedAppendixPrefix.match(this.textParserRegex) !== null;

				this.appConsole.debugLogJson({ __appConfigCommandsEnabled: this.config.commands.enabled, isCommand, isMacro, replacedAppendixPrefix, textParserRegex: this.textParserRegex });

				let output = replacedAppendixPrefix.replace(/\shogy\s/g, ', hogy ');

				if (this.config.others.mtaConsoleInputMode && !output.startsWith('/')) {
					output = output.replace('say, ', 'say ');
				}

				if ((isCommand || isMacro) && this.config.commands.enabled) {
					this._output = (await cmd.voiceCommandHandler(replacedAppendixPrefix.replace(this.textParserRegex, '!makró:'), this._output)) || this._output;
					return;
				} else {
					this._output = output;
				}

				this.appConsole.debugLog(textReplacer(this.dictionary.textFeedback.chromeFunctions.speechRecognition.info.output, output));

				if (this.config.output.partial) {
					return;
				}

				await printText(output);

				this.mainWindow.webContents.send('speech:recognition', {
					event: 'transcript',
					data: this.partialOutput,
				});
			}
		}, 500);
	}

	private async speechRecognitionTranscript(transcript: string) {
		const transcriptLowerCase = transcript.toLowerCase();

		if (this.partialOutputMatrix[this.partialOutputIndex] === undefined) {
			this.partialOutputMatrix[this.partialOutputIndex] = [transcriptLowerCase];
		} else if (transcriptLowerCase.startsWith(this.partialOutputMatrix[this.partialOutputIndex].join(' '))) {
			this.partialOutputMatrix[this.partialOutputIndex].push(transcriptLowerCase.slice(this.partialOutputMatrix[this.partialOutputIndex].join(' ').length + 1));
		} else {
			this.partialOutputIndex++;
			this.partialOutputMatrix[this.partialOutputIndex] = [transcriptLowerCase];
		}

		this.partialOutput = this.partialOutputMatrix.map((o) => o.join(', ')).join(', ');

		if (this.config.output.partial) {
			await printText(this.partialOutput.slice(this._partialOutput.length));
		}

		this.appConsole.debugLog(textReplacer(this.dictionary.textFeedback.chromeFunctions.speechRecognition.transcript.partialOutput, this.partialOutput));

		this.mainWindow.webContents.send('speech:recognition', {
			event: 'transcript:partial',
			data: this.partialOutput.slice(this._partialOutput.length),
		});
	}
}
