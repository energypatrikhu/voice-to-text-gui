import { __app } from './app.js';

export class SettingsUpdate {
	private mainWindow;

	constructor(mainWindow: Electron.BrowserWindow) {
		this.mainWindow = mainWindow;
	}

	send(event: 'config' | 'macros' | 'dictionary') {
		this.mainWindow.webContents.send('electron', {
			event,
			data: { [event]: __app[event] },
		});
	}
}
