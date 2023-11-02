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
	private isBeta;
	private isReady: boolean = false;

	constructor(ipcMain: Electron.IpcMain, mainWindow: Electron.BrowserWindow, isDev: boolean, isBeta: boolean) {
		this.ipcMain = ipcMain;
		this.mainWindow = mainWindow;
		this.isDev = isDev;
		this.isBeta = isBeta;

		this.router();
	}

	router() {
		this.ipcMain.on('electron', async (_event, { event, data }) => {
			switch (event) {
				case 'ready': {
					await main(this.ipcMain, this.mainWindow, this.isDev, this.isBeta);
					this.isReady = true;
					break;
				}

				case 'config': {
					if (this.isReady && !_.isEqual(__app.config, data)) {
						console.log('Config Changed Event');

						const { oldApp } = __app.set({ config: data });
						await saveJson('config', data);
						__app.console.debugLog('Config Changed!');

						if (!_.isEqual(oldApp.config.feedback.language, __app.config.feedback.language)) {
							console.log('feedback.language changed!');

							const dictionary = await loadDictionary();
							__app.set({ dictionary });

							if (!this.isDev) {
								__app.speechSynthesis.updateEngine();
							}

							this.mainWindow.webContents.send('electron', { event: 'dictionary', data: { dictionary } });
						}

						if (!_.isEqual(oldApp.config.speechRecognition, __app.config.speechRecognition)) {
							console.log('speechRecognition changed!');
							if (!this.isDev) {
								__app.speechRecognition.updateEngine();
							}
						}
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
