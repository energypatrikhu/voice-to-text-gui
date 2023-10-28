import { app } from 'electron';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { EOL } from 'os';
import { join } from 'path';

import { convertTextArray } from './convert-text-array.js';
import { getLocaleTime } from './get-locale-time.js';

import type { Console as AppConsole } from '../../types/Console.js';
import type { ConfigOptions } from '../../types/ConfigOptions.js';

export class Console {
	private ipcMain;
	private mainWindow;
	private isDev;
	private saveToFile: boolean;

	private logsPath = join(app.getPath('documents'), 'Voice To Text Logs');

	constructor(ipcMain: Electron.IpcMain, mainWindow: Electron.BrowserWindow, isDev: boolean, saveToFile: ConfigOptions['logs']['saveToFile']) {
		this.ipcMain = ipcMain;
		this.mainWindow = mainWindow;
		this.isDev = isDev;
		this.saveToFile = saveToFile;
	}

	init() {
		if (!this.saveToFile || this.isDev) return this;

		if (!existsSync(this.logsPath)) {
			mkdirSync(this.logsPath, {
				recursive: true,
			});
		}

		this.ipcMain.on('electron', async (_, { event, data }) => {
			switch (event) {
				case 'log': {
					appendFileSync(join(this.logsPath, data.filename), ['[' + data.type + ']', '[' + data.timestamp + ']', '[' + data.severity + ']', '\n', ...data.textArray, EOL].join(' '));
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
				lang: 'txt',
				...data,
				timestamp: Date.now(),
				dateTime: getLocaleTime(),
				textArray: convertTextArray(data.textArray!),
			},
		});

		return this;
	}

	logJson(...messages: Array<any>) {
		this.sendLog({ type: 'Normal', severity: 'Info', lang: 'json', textArray: messages });
	}
	debugLogJson(...messages: Array<any>) {
		this.sendLog({ type: 'Debug', severity: 'Info', lang: 'json', textArray: messages });
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
