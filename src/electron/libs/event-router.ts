import { dialog } from 'electron';
import _ from 'lodash';
import { basename } from 'path';

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
					if (this.isReady && !_.isEqual(__app.config, data)) {
						console.log('Config Changed Event', { isReady: this.isReady, isEqual: _.isEqual(__app.config, data) });
						console.log(JSON.stringify({ config: __app.config, newConfig: data }, null, '\t'));

						if (!_.isEqual(__app.config.feedback.language, data.feedback.language)) {
							console.log('feedback.language changed!');

							const dictionary = await loadDictionary(data.feedback.language, this.isDev);

							__app.dictionary = dictionary;
							__app.speechSynthesis?.updateEngine(data.feedback);

							this.mainWindow.webContents.send('electron', { event: 'dictionary', data: { dictionary } });
						}

						if (!_.isEqual(__app.config.speechRecognition, data.speechRecognition)) {
							console.log('speechRecognition.language changed!');

							__app.speechRecognition?.updateEngine(data.speechRecognition);
						}

						__app.console.debugLog('Config Changed!');
						__app.config = data;

						saveJson('config', data);
					}
					break;
				}

				case 'selectAudioFile': {
					const fileData = dialog.showOpenDialogSync(this.mainWindow, {
						title: 'Select sound file',
						properties: ['openFile', 'showHiddenFiles', 'dontAddToRecent'],
						filters: [
							{
								name: 'Audio',
								extensions: ['mp3', 'm4a', 'ogg', 'opus', 'flac', 'aac', 'wav', 'wma'],
							},
						],
					});

					this.mainWindow.webContents.send('electron', {
						event: 'selectAudioFile',
						data: fileData && fileData.length > 0 ? { filepath: fileData[0], basepath: fileData[0].slice(0, -basename(fileData[0])).length, basename: basename(fileData[0]) } : null,
					});
					break;
				}

				case 'playTest': {
					this.mainWindow.webContents.send('electron', {
						event: 'playAudio',
						data: {
							src: __app.config.feedback.sounds.file.filepath,
							volume: __app.config.feedback.sounds.volume,
						},
					});
					break;
				}
			}
		});
	}
}
