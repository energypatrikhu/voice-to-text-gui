import { main } from './main.js';

export class EventRouter {
	private ipcMain;
	private mainWindow;
	private isDev;

	constructor(ipcMain: Electron.IpcMain, mainWindow: Electron.BrowserWindow, isDev: boolean) {
		this.ipcMain = ipcMain;
		this.mainWindow = mainWindow;
		this.isDev = isDev;

		this.router();
	}

	router() {
		this.ipcMain.on('electron', async (_, { event }) => {
			switch (event) {
				case 'ready': {
					main(this.ipcMain, this.mainWindow, this.isDev);
					break;
				}
			}
		});
	}
}
