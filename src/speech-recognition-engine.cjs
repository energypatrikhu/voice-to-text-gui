const { Page, EventEmitter: puppeteerEventEmitter } = require('puppeteer-core');

class SpeechRecognitionEngine {
	#ipcMain;
	#mainWindow;
	#page;

	#pageEmitter = new puppeteerEventEmitter();

	/**
	 * @type {string}
	 */
	#_partialOutput = '';
	/**
	 * @type {string}
	 */
	#partialOutput = '';
	/**
	 * @type {string[][]}
	 */
	#partialOutputMatrix = [];
	/**
	 * @type {number}
	 */
	#partialOutputIndex = 0;
	/**
	 * @type {boolean}
	 */
	#stopOutput = false;
	/**
	 * @type {any}
	 */
	#stopTimer = null;

	/**
	 * @param {Electron.IpcMain} ipcMain Electron.IpcMain
	 * @param {Electron.BrowserWindow} mainWindow Electron.BrowserWindow
	 * @param {Page} page puppeteer-core.Page
	 */
	constructor(ipcMain, mainWindow, page) {
		this.#ipcMain = ipcMain;
		this.#mainWindow = mainWindow;
		this.#page = page;

		this.#ipcMain.on(
			'speech:recognition',
			/**
			 * @param {never} _
			 * @param {{event: "init" | "start" | "stop", data: any}} data
			 */
			async (_, { event, data }) => {
				console.log('class:SpeechRecognitionEngine', { event, data });

				switch (event) {
					case 'init': {
						await this.#initExposeFunctions();
						await this.#initSpeechRecognitionEngine(data);

						this.#mainWindow.webContents.send('speech:recognition', {
							event: 'initialized',
							data: 'recognition',
						});
						break;
					}
					case 'start': {
						await this.#speechRecognitionStart();
						break;
					}
					case 'stop': {
						await this.#speechRecognitionStop();
						break;
					}
				}
			},
		);
	}

	async #initExposeFunctions() {
		this.#pageEmitter.on(
			'speech:recognition:info',
			/**
			 * @param {any} info
			 */
			(info) => this.#speechRecognitionInfo(info),
		);
		await this.#page.exposeFunction('callSpeechRecognitionInfo', (info) => this.#pageEmitter.emit('speech:recognition:info', info));

		this.#pageEmitter.on(
			'speech:recognition:transcript',
			/**
			 * @param {any} transcript
			 */
			(transcript) => this.#speechRecognitionTranscript(transcript),
		);
		await this.#page.exposeFunction('callSpeechRecognitionTranscript', (transcript) => this.#pageEmitter.emit('speech:recognition:transcript', transcript));
	}

	/**
	 * @param {Partial<SpeechRecognition>} speechRecognitionOptions Partial<SpeechRecognition>
	 */
	async #initSpeechRecognitionEngine(speechRecognitionOptions) {
		await this.#page.evaluate((speechRecognitionOptions) => {
			window.speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

			for (const optionName in speechRecognitionOptions) {
				window.speechRecognition[optionName] = speechRecognitionOptions[optionName];
			}

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

	async #speechRecognitionStart() {
		this.#stopOutput = true;
		this.#_partialOutput = '';
		this.#partialOutput = '';
		this.#partialOutputMatrix = [];
		this.#partialOutputIndex = 0;

		clearTimeout(this.#stopTimer);

		await this.#page.evaluate(() => {
			try {
				window.speechRecognition.start();
				window.speechRecognitionEnabled = true;
			} catch (error) {
				console.log(error);
			}
		});
	}

	async #speechRecognitionStop() {
		this.#stopOutput = false;

		await this.#page.evaluate(() => {
			try {
				window.speechRecognition.stop();
				window.speechRecognitionEnabled = false;
			} catch (error) {
				console.log(error);
			}
		});
	}

	/**
	 * @param {"started" | "stopped"} info "started" | "stopped"
	 */
	#speechRecognitionInfo(info) {
		this.#mainWindow.webContents.send('speech:recognition', {
			event: info,
			data: null,
		});

		clearTimeout(this.#stopTimer);
		this.stopTimer = setTimeout(async () => {
			if (info == 'stopped' && !this.#stopOutput) {
				this.#mainWindow.webContents.send('speech:recognition', {
					event: 'transcript',
					data: this.#partialOutput,
				});
			}
		}, 500);
	}

	/**
	 * @param {string} transcript string
	 */
	#speechRecognitionTranscript(transcript) {
		const transcriptLowerCase = transcript.toLowerCase();

		if (this.#partialOutputMatrix[this.#partialOutputIndex] == undefined) {
			this.#partialOutputMatrix[this.#partialOutputIndex] = [transcriptLowerCase];
		} else if (transcriptLowerCase.startsWith(this.#partialOutputMatrix[this.#partialOutputIndex].join(' '))) {
			this.#partialOutputMatrix[this.#partialOutputIndex].push(transcriptLowerCase.slice(this.#partialOutputMatrix[this.#partialOutputIndex].join(' ').length + 1));
		} else {
			this.#partialOutputIndex++;
			this.#partialOutputMatrix[this.#partialOutputIndex] = [transcriptLowerCase];
		}

		this.#partialOutput = this.#partialOutputMatrix.map((o) => o.join(', ')).join(', ');

		this.#mainWindow.webContents.send('speech:recognition', {
			event: 'transcript:partial',
			data: this.#partialOutput.slice(this.#_partialOutput.length),
		});
	}
}

module.exports = { SpeechRecognitionEngine };
