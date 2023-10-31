import type { ConfigOptions } from '../../types/ConfigOptions.js';
import type { Macro } from '../../types/Macro.js';
import type { Versions } from '../../types/electron/Versions.js';
import type { Dictionary } from '../../types/Dictionary.js';
import type { SpeechRecognitionEngine } from './speech-recognition-engine.js';
import type { SpeechSynthesisEngine } from './speech-synthesis-engine.js';
import type { Page } from 'puppeteer-core';
import type { Console } from './console.js';
import type { SettingsUpdate } from './send-settings-update.js';

export class App {
	isDev!: boolean;
	isBeta!: boolean;

	ipcMain!: Electron.IpcMain;
	mainWindow!: Electron.BrowserWindow;

	config!: ConfigOptions;
	macros!: Array<Macro>;
	versions!: Versions;
	dictionary!: Dictionary;
	chromePage!: Page | null;

	speechRecognition!: SpeechRecognitionEngine | null;
	speechSynthesis!: SpeechSynthesisEngine | null;
	console!: Console;
	settingsUpdate!: SettingsUpdate;

	checkingForUpdate!: boolean;

	userDataFolder!: string;

	init(data: Partial<App>) {
		Object.assign(this, data);
		return this;
	}
}

export const __app = new App();
