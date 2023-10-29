import _ from 'lodash';

import { __app } from './app.js';
import { loadDictionary } from './dictionary.js';
import { saveJson } from './json-storage.js';
import { main } from './main.js';

export class EventRouter {
	private ipcMain;
	private mainWindow;
	private isDev;
	private isReady: boolean = false;

	constructor(ipcMain: Electron.IpcMain, mainWindow: Electron.BrowserWindow, isDev: boolean) {
		this.ipcMain = ipcMain;
		this.mainWindow = mainWindow;
		this.isDev = isDev;

		this.router();
	}

	router() {
		this.ipcMain.on('electron', async (_event, { event, data }) => {
			switch (event) {
				case 'ready': {
					await main(this.ipcMain, this.mainWindow, this.isDev);
					this.isReady = true;
					break;
				}

				case 'config': {
					console.log('Config Changed Event', { isReady: this.isReady, isEqual: _.isEqual(__app.config, data) });

					if (this.isReady && !_.isEqual(__app.config, data)) {
						__app.console.debugLog('Config Changed!');

						__app.config = data;
						saveJson('config', data);
					}

					if (!_.isEqual(__app.config.feedback.language, data.feedback.language)) {
						const dictionary = await loadDictionary(data.feedback.language, this.isDev);

						__app.dictionary = dictionary;
						__app.speechSynthesis?.updateEngine(data.feedback);

						this.mainWindow.webContents.send('electron', { event: 'dictionary', data: { dictionary } });
					}

					if (!_.isEqual(__app.config.speechRecognition.language, data.speechRecognition.language) || !_.isEqual(__app.config.speechRecognition.customWordsAndPhrases, data.speechRecognition.customWordsAndPhrases)) {
						__app.speechRecognition?.updateEngine(data.speechRecognition);
					}
					break;
				}
			}
		});
	}
}
