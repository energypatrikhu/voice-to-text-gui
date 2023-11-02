import { __app } from './app.js';

export class SettingsUpdate {
	send(event: 'config' | 'macros' | 'dictionary') {
		__app.mainWindow.webContents.send('electron', {
			event,
			data: { [event]: __app[event] },
		});
	}
}
