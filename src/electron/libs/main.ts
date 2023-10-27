import { app, BrowserWindow } from 'electron';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

import { __app } from './app.js';
import { ChromeInstance } from './chrome-instance.js';
import { cmd } from './command-handler.js';
import { loadConfig } from './config.js';
import { Console } from './console.js';
import { loadDictionary } from './dictionary.js';
import { getActiveWindowName } from './get-active-window-name.js';
import { keyboardShortcutMapper } from './keyboard-shortcut-mapper.js';
import { loadMacros } from './macros.js';
import { SpeechRecognitionEngine } from './speech-recognition-engine.js';
import { SpeechSynthesisEngine } from './speech-synthesis-engine.js';
import { textReplacer } from './text-replacer.js';
import { uioHookWrapper } from './uio-hook-wrapper.js';

export async function main(ipcMain: Electron.IpcMain, mainWindow: BrowserWindow, isDev: boolean) {
	const versions = {
		electronVersion: isDev ? app.getVersion() : process.versions.electron,
		appVersion: isDev ? JSON.parse(readFileSync('./package.json', 'utf-8')).version : app.getVersion(),
	};

	const userDataFolder = join(app.getPath('userData'), app.name);

	const config = loadConfig();
	const macros = loadMacros();
	const dictionary = await loadDictionary(config.feedback.language, isDev);

	const appConsole = new Console(ipcMain, mainWindow, isDev, config.logs).init();

	appConsole.debugLog(dictionary.textFeedback.config.config.loaded);

	// if (isDev) {
	// 	__app.init({
	// 		isDev,
	// 		ipcMain,
	// 		mainWindow,
	// 		config,
	// 		macros,
	// 		versions,
	// 		dictionary,
	// 		chromePage: null,
	// 		speechRecognition: null,
	// 		speechSynthesis: null,
	// 		console: appConsole,
	// 		userDataFolder,
	// 	});
	// } else {
	if (!existsSync(userDataFolder)) {
		mkdirSync(userDataFolder, { recursive: true });
	}

	appConsole.debugLog(dictionary.textFeedback.index.chrome.initializing);
	const chromePage = await new ChromeInstance(isDev).init();

	appConsole.debugLog(dictionary.textFeedback.chromeInstance.speechRecognition.starting);
	const speechRecognition = await new SpeechRecognitionEngine(mainWindow, chromePage, config, appConsole, dictionary).init();

	const speechSynthesis = await new SpeechSynthesisEngine(chromePage).init(config.feedback);

	__app.init({
		isDev,
		ipcMain,
		mainWindow,
		config,
		macros,
		versions,
		dictionary,
		chromePage,
		speechRecognition,
		speechSynthesis,
		console: appConsole,
		userDataFolder,
	});
	// }

	mainWindow.webContents.send('electron', {
		event: 'ready',
		data: {
			versions,
			config,
			macros,
			dictionary,
		},
	});

	let voiceRecognitionEnabled = false;
	let autoReleaseTimer: string | number | NodeJS.Timeout | null | undefined = null;
	let lastActiveButtons: string[] = [];

	async function voiceRecognitionEnable(outputPrefix: string | null) {
		try {
			if (__app.config.windowAllowList.enabled && !__app.config.windowAllowList.windows.includes(await getActiveWindowName())) {
				return;
			}

			voiceRecognitionEnabled = true;

			__app.console.debugLog(textReplacer(__app.dictionary.textFeedback.index.keyPressed, voiceRecognitionEnabled));

			// nodeEmitter.emit('speechRecognition:start', outputPrefix);
			__app.speechRecognition?.start(outputPrefix);
		} catch (error) {
			__app.console.debugErrorLog(error);
		}
	}

	function voiceRecognitionDisable() {
		try {
			voiceRecognitionEnabled = false;
			__app.console.debugLog(textReplacer(__app.dictionary.textFeedback.index.keyPressed, voiceRecognitionEnabled));

			// nodeEmitter.emit('speechRecognition:stop');
			__app.speechRecognition?.stop();
		} catch (error) {
			__app.console.debugErrorLog(error);
		}
	}

	__app.console.debugLog(__app.dictionary.textFeedback.index.registering.ioHook);
	uioHookWrapper((event) => {
		if (__app.config.others.showActiveButtons) {
			let activeButtons = Object.entries(event.pressedKeys)
				.filter((btn) => btn[1] === true)
				.map((btn) => btn[0]);

			if (JSON.stringify(lastActiveButtons) != JSON.stringify(activeButtons)) {
				__app.console.debugLog(textReplacer(__app.dictionary.textFeedback.index.activeButtons, activeButtons));
				lastActiveButtons = activeButtons;
			}
		}

		try {
			let keyboardShortcutMapperResult = keyboardShortcutMapper(event.pressedKeys);

			if (__app.config.input.holdToActivate) {
				if (!voiceRecognitionEnabled && keyboardShortcutMapperResult.match) {
					voiceRecognitionEnable(keyboardShortcutMapperResult.outputPrefix);
				} else if (voiceRecognitionEnabled && !keyboardShortcutMapperResult.match) {
					voiceRecognitionDisable();
				}
			} else if (!voiceRecognitionEnabled && keyboardShortcutMapperResult.match) {
				voiceRecognitionEnable(keyboardShortcutMapperResult.outputPrefix);

				if (autoReleaseTimer) clearTimeout(autoReleaseTimer);

				autoReleaseTimer = setTimeout(() => {
					if (!__app.config.input.autoRelease.enabled) {
						return;
					}
					voiceRecognitionDisable();
				}, __app.config.input.autoRelease.releaseTime * 1000);
			} else if (voiceRecognitionEnabled && keyboardShortcutMapperResult.match) {
				voiceRecognitionDisable();

				if (autoReleaseTimer) clearTimeout(autoReleaseTimer);
			}
		} catch (error) {
			__app.console.debugErrorLog(error);
		}
	});

	__app.console.debugLog(__app.dictionary.textFeedback.index.registering.commands);
	await cmd.init(__app.speechSynthesis!);

	if (__app.config.input.holdToActivate) {
		__app.console.log(__app.dictionary.textFeedback.index.app.started.hold);
	} else {
		__app.console.log(__app.dictionary.textFeedback.index.app.started.toggle);
	}

	__app.console.log([__app.dictionary.textFeedback.index.creatorsCredits.wrapper, __app.dictionary.textFeedback.index.creatorsCredits.createdBy, __app.dictionary.textFeedback.index.creatorsCredits.ideaBy, __app.dictionary.textFeedback.index.creatorsCredits.wrapper].join('\n'));

	if (__app.config.commands.enabled) {
		__app.console.log(textReplacer(__app.dictionary.textFeedback.index.commandsEnabled, __app.config.commands.prefix));
	}

	if (__app.speechSynthesis) __app.speechSynthesis.speak(__app.dictionary.speechFeedback.index.appStarted);
}