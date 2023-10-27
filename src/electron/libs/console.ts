import { app } from 'electron';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { EOL } from 'os';
import { join } from 'path';

import { convertTextArray } from './convert-text-array.js';
import { getLocaleTime } from './get-locale-time.js';

import type { Console as AppConsole } from '../../types/Console.js';

export class Console {
	private ipcMain;
	private mainWindow;
	private isDev;
	private saveToFile: boolean;

	private logsPath = join(app.getPath('documents'), 'Voice To Text Logs');

	constructor(ipcMain: Electron.IpcMain, mainWindow: Electron.BrowserWindow, isDev: boolean, data: any) {
		this.ipcMain = ipcMain;
		this.mainWindow = mainWindow;
		this.isDev = isDev;
		this.saveToFile = data.saveToFile;
	}

	init() {
		if (!this.saveToFile) return this;

		if (!existsSync(this.logsPath) && !this.isDev) {
			mkdirSync(this.logsPath, {
				recursive: true,
			});
		}

		this.ipcMain.on('electron', async (_, { event, data }) => {
			switch (event) {
				case 'log': {
					if (this.isDev) return;
					appendFileSync(join(this.logsPath, data.filename), ['[' + data.type + ']', '[' + data.timestamp + ']', '[' + data.severity + ']', EOL, ...data.textArray, EOL].join(' '));
					break;
				}
			}
		});

		return this;
	}

	private sendLog(data: Partial<AppConsole>) {
		this.mainWindow.webContents.send('electron', {
			event: 'log',
			data: {
				...data,
				timestamp: Date.now(),
				dateTime: getLocaleTime(),
				textArray: convertTextArray(data.textArray!),
			},
		});

		return this;
	}

	log(...messages: Array<any>) {
		this.sendLog({ type: 'Normal', severity: 'Info', textArray: messages });
	}
	debugLog(...messages: Array<any>) {
		this.sendLog({ type: 'Debug', severity: 'Info', textArray: messages });
	}

	warningLog(...messages: Array<any>) {
		this.sendLog({ type: 'Normal', severity: 'Warning', textArray: messages });
	}
	debugWarningLog(...messages: Array<any>) {
		this.sendLog({ type: 'Debug', severity: 'Warning', textArray: messages });
	}

	errorLog(...messages: Array<any>) {
		this.sendLog({ type: 'Normal', severity: 'Error', textArray: messages });
	}
	debugErrorLog(...messages: Array<any>) {
		this.sendLog({ type: 'Debug', severity: 'Error', textArray: messages });
	}
}
