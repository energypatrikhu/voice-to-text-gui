import _ from 'lodash';

import { __app } from './app.js';
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
					break;
				}
			}
		});
	}
}
