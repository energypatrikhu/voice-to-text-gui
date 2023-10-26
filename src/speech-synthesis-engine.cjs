const { Page, EventEmitter: puppeteerEventEmitter } = require('puppeteer-core');

class SpeechSynthesisEngine {
	#ipcMain;
	#mainWindow;
	#page;

	#pageEmitter = new puppeteerEventEmitter();

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
			'speech:synthesis',
			/**
			 * @param {never} _
			 * @param {{event: "init" | "start" | "stop", data: any}} data
			 */
			async (_, { event, data }) => {
				console.log('class:SpeechSynthesisEngine', { event, data });

				switch (event) {
					case 'init': {
						await this.#initExposeFunctions();
						await this.#initSpeechSynthesisEngine({ language: data.language, volume: data.speech.volume });

						this.#mainWindow.webContents.send('speech:synthesis', {
							event: 'initialized',
							data: 'synthesis',
						});
						break;
					}
					case 'speak': {
						await this.#speechSynthesisSpeak(data);
						break;
					}
				}
			},
		);
	}

	async #initExposeFunctions() {
		this.#pageEmitter.on('speech:synthesis:finished', () => this.#speechSynthesisFinished());
		await this.#page.exposeFunction('callSpeechSynthesisFinished', (info) => this.#pageEmitter.emit('speech:synthesis:finished', info));
	}

	/**
	 * @param {Partial<Window.speechSynthesisOptions>} speechSynthesisOptions Partial<Window.speechSynthesisOptions>
	 */
	async #initSpeechSynthesisEngine(speechSynthesisOptions) {
		await this.#page.evaluate((speechSynthesisOptions) => {
			const voices = Array.from(window.speechSynthesis.getVoices());

			window.speechSynthesisOptions = {
				lang: speechSynthesisOptions.language || voices.filter((voice) => voice.default)[0].lang,
				voice: voices.filter((voice) => voice.lang.includes(speechSynthesisOptions.language))[0],
				volume: speechSynthesisOptions.volume,
			};
		}, speechSynthesisOptions);
	}

	/**
	 * @param {string} text
	 */
	async #speechSynthesisSpeak(text) {
		await this.#page.evaluate((text) => {
			if (window.speechSynthesis.speaking) {
				window.speechSynthesis.cancel();
			}

			const utterance = new SpeechSynthesisUtterance(text);

			utterance.voice = window.speechSynthesisOptions.voice;
			utterance.volume = window.speechSynthesisOptions.volume;

			window.speechSynthesis.speak(utterance);

			utterance.addEventListener('end', window.callSpeechSynthesisFinished);
		}, text);
	}

	#speechSynthesisFinished() {
		this.#mainWindow.webContents.send('speech:recognition', {
			event: 'finished',
			data: null,
		});
	}
}

module.exports = { SpeechSynthesisEngine };
