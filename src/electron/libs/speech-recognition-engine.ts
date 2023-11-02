import { EventEmitter } from 'puppeteer-core';

import { __app } from './app.js';
import { appendixPrefixer } from './appendix-prefixer.js';
import { cmd } from './command-handler.js';
import { printText } from './press-keys.js';
import { replaceCharMap } from './replace-char-map.js';
import { replaceGameChatPrefixMap } from './replace-game-chat-prefix-map.js';
import { soundWrapper } from './sound-wrapper.js';
import { textReplacer } from './text-replacer.js';
import { uioHookWrapper } from './uio-hook-wrapper.js';

import type { ConfigOptions } from '../../types/ConfigOptions.js';

export class SpeechRecognitionEngine {
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

	async init() {
		uioHookWrapper((event) => {
			if (!event.pressedKeys['escape']) {
				return;
			}
			if (this.stopOutput) {
				return;
			}

			__app.console.logJson(__app.dictionary.textFeedback.chromeFunctions.speechRecognition.outputStopped);

			this._output = '';
			this._partialOutput = '';
			this.partialOutput = '';
			this.stopOutput = true;
		});

		this.textParserRegex = new RegExp('(' + [...['makró', 'makrók', 'szöveg', 'szövegek'].map((macroPreffix) => `\\${__app.config.commands.prefix}\\s${macroPreffix}\\${__app.config.commands.splitter}\\s`)].join(')|(') + ')', 'gi');

		await this.initExposeFunctions();
		await this.initSpeechRecognitionEngine();

		return this;
	}

	private async initExposeFunctions() {
		this.pageEmitter.on('speech:recognition:info', (info: any) => this.speechRecognitionInfo(info));
		await __app.chromePage.exposeFunction('callSpeechRecognitionInfo', (info: any) => this.pageEmitter.emit('speech:recognition:info', info));

		this.pageEmitter.on('speech:recognition:transcript', (transcript: any) => this.speechRecognitionTranscript(transcript));
		await __app.chromePage.exposeFunction('callSpeechRecognitionTranscript', (transcript: any) => this.pageEmitter.emit('speech:recognition:transcript', transcript));
	}

	private async initSpeechRecognitionEngine() {
		await __app.chromePage.evaluate((speechRecognitionOptions) => {
			window.speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
			window.speechGrammarList = new (window.SpeechGrammarList || window.webkitSpeechGrammarList)();

			Object.assign(window.speechRecognition, {
				continuous: true,
				interimResults: false,
				lang: speechRecognitionOptions.language ?? 'hu-HU',
				maxAlternatives: 1,
				customWordsAndPhrases: speechRecognitionOptions.customWordsAndPhrases ?? [],
			});

			const grammar = `#JSGF V1.0; grammar words; public <word> = ${speechRecognitionOptions.customWordsAndPhrases.join(' | ')};`;
			window.speechGrammarList.addFromString(grammar, 1);
			window.speechRecognition.grammars = window.speechGrammarList;

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
		}, __app.config.speechRecognition);
	}

	updateEngine() {
		this.initSpeechRecognitionEngine();
	}

	async start(_outputPrefix: string | null) {
		this.stopOutput = true;
		this._partialOutput = '';
		this.partialOutput = '';
		this.outputPrefix = _outputPrefix ? _outputPrefix + ' ' : '';
		this.partialOutputMatrix = [];
		this.partialOutputIndex = 0;

		clearTimeout(this.stopTimer);

		__app.console.debugLog(textReplacer(__app.dictionary.textFeedback.chromeFunctions.speechRecognition.start.outputPrefix, _outputPrefix));

		await __app.chromePage.evaluate(() => {
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

		await __app.chromePage.evaluate(() => {
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
				const replacedChar = replaceCharMap(this.outputPrefix + this.partialOutput)!;
				const replacedGameChatPrefix = replaceGameChatPrefixMap(replacedChar)!;
				const replacedAppendixPrefix = appendixPrefixer(replacedGameChatPrefix)!;

				if (replacedAppendixPrefix === '') {
					return;
				}

				const isCommand = replacedAppendixPrefix.startsWith(__app.config.commands.prefix);

				const isMacro = replacedAppendixPrefix.match(this.textParserRegex) !== null;

				__app.console.debugLogJson({ __appConfigCommandsEnabled: __app.config.commands.enabled, isCommand, isMacro, replacedAppendixPrefix, textParserRegex: this.textParserRegex });

				let output = replacedAppendixPrefix.replace(/\shogy\s/g, ', hogy ');

				if (__app.config.others.mtaConsoleInputMode && !output.startsWith('/')) {
					output = output.replace('say, ', 'say ');
				}

				if ((isCommand || isMacro) && __app.config.commands.enabled) {
					this._output = (await cmd.voiceCommandHandler(replacedAppendixPrefix.replace(this.textParserRegex, '!makró:'), this._output)) || this._output;
					return;
				} else {
					this._output = output;
				}

				__app.console.log(textReplacer(__app.dictionary.textFeedback.chromeFunctions.speechRecognition.info.output, output));

				if (__app.config.output.partial) {
					return;
				}

				await printText(output);

				__app.mainWindow.webContents.send('speech:recognition', {
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

		if (__app.config.output.partial) {
			await printText(this.partialOutput.slice(this._partialOutput.length));
		}

		__app.console.log(textReplacer(__app.dictionary.textFeedback.chromeFunctions.speechRecognition.transcript.partialOutput, this.partialOutput));

		__app.mainWindow.webContents.send('speech:recognition', {
			event: 'transcript:partial',
			data: this.partialOutput.slice(this._partialOutput.length),
		});
	}
}
