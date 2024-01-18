import { app, BrowserWindow } from 'electron';
import { existsSync } from 'fs';
import { mkdir, readFile } from 'fs/promises';
import _ from 'lodash';
import { join } from 'path';

import { __app } from './app.js';
import { ChromeInstance } from './chrome-instance.js';
import { cmd } from './command-handler.js';
import { loadConfig } from './config.js';
import { Console } from './console.js';
import { getActiveWindowName } from './get-active-window-name.js';
import { keyboardShortcutMapper } from './keyboard-shortcut-mapper.js';
import { loadMacros } from './macros.js';
import { SettingsUpdate } from './send-settings-update.js';
import { SpeechRecognitionEngine } from './speech-recognition-engine.js';
import { SpeechSynthesisEngine } from './speech-synthesis-engine.js';
import { textReplacer } from './text-replacer.js';
import { loadTranslation } from './translation.js';
import { uioHookWrapper } from './uio-hook-wrapper.js';
import { Updater } from './updater.js';

export async function main(ipcMain: Electron.IpcMain, mainWindow: BrowserWindow, isDev: boolean, isBeta: boolean) {
	__app.set({
		checkingForUpdate: false,
		downloadedUpdate: false,
		ipcMain,
		isBeta,
		isDev,
		mainWindow,
		updateReason: null,
		userDataFolder: join(app.getPath('userData'), app.name),
	});

	__app.set({
		config: await loadConfig(),
		macros: await loadMacros(),
		versions: {
			electronVersion: __app.isDev ? app.getVersion() : process.versions.electron,
			appVersion: __app.isDev ? JSON.parse(await readFile('./package.json', 'utf-8')).version : app.getVersion(),
		},
	});

	__app.set({
		console: await new Console().init(),
		translation: await loadTranslation(),
		settingsUpdate: new SettingsUpdate(),
	});

	mainWindow.webContents.send('electron', { event: 'ready', data: _.pick(__app, ['versions', 'config', 'macros', 'translation']) });

	if (isDev) {
		__app.console.log(__app.translation.speechFeedback.index.appStarted);
		return;
	}

	__app.console.log(__app.translation.textFeedback.index.app.loading);

	if (await new Updater().init()) return;

	if (!existsSync(__app.userDataFolder)) {
		await mkdir(__app.userDataFolder, { recursive: true });
	}

	__app.console.debugLog(__app.translation.textFeedback.index.chrome.initializing);
	__app.set({ chromePage: await new ChromeInstance().init() });

	__app.console.debugLog(__app.translation.textFeedback.chromeInstance.speechRecognition.starting);
	__app.set({ speechRecognition: await new SpeechRecognitionEngine().init() });

	__app.set({ speechSynthesis: await new SpeechSynthesisEngine().init() });

	let voiceRecognitionEnabled = false;
	let autoReleaseTimer: string | number | NodeJS.Timeout | null | undefined = null;
	let lastActiveButtons: string[] = [];

	async function voiceRecognitionEnable(outputPrefix: string | null) {
		if (__app.config.windowAllowList.enabled && !__app.config.windowAllowList.windows.includes(await getActiveWindowName())) {
			return;
		}

		voiceRecognitionEnabled = true;
		__app.console.debugLog(textReplacer(__app.translation.textFeedback.index.keyPressed, voiceRecognitionEnabled));
		__app.speechRecognition.start(outputPrefix);
	}

	function voiceRecognitionDisable() {
		voiceRecognitionEnabled = false;
		__app.console.debugLog(textReplacer(__app.translation.textFeedback.index.keyPressed, voiceRecognitionEnabled));
		__app.speechRecognition.stop();
	}

	__app.console.debugLog(__app.translation.textFeedback.index.registering.ioHook);
	uioHookWrapper((event) => {
		if (__app.config.others.showActiveButtons) {
			const activeButtons = Object.entries(event.pressedKeys)
				.filter((btn) => btn[1] === true)
				.map((btn) => btn[0]);

			if (JSON.stringify(lastActiveButtons) !== JSON.stringify(activeButtons)) {
				__app.console.debugLog(textReplacer(__app.translation.textFeedback.index.activeButtons, activeButtons));
				lastActiveButtons = activeButtons;
			}
		}

		try {
			const keyboardShortcutMapperResult = keyboardShortcutMapper(event.pressedKeys);

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

	__app.console.debugLog(__app.translation.textFeedback.index.registering.commands);
	await cmd.init(__app.speechSynthesis);

	__app.console.logJson(__app.config.input.holdToActivate ? __app.translation.textFeedback.index.app.started.hold : __app.translation.textFeedback.index.app.started.toggle);

	__app.console.log([__app.translation.textFeedback.index.creatorsCredits.wrapper, __app.translation.textFeedback.index.creatorsCredits.createdBy, __app.translation.textFeedback.index.creatorsCredits.ideaBy, __app.translation.textFeedback.index.creatorsCredits.wrapper].join('\n'));

	if (__app.config.commands.enabled) {
		__app.console.logJson(textReplacer(__app.translation.textFeedback.index.commandsEnabled, __app.config.commands.prefix));
	}

	__app.console.log(__app.translation.speechFeedback.index.appStarted);
	await __app.speechSynthesis.speak(__app.translation.speechFeedback.index.appStarted);
}
