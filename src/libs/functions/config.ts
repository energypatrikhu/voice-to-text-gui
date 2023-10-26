import type { Config } from '$types/Config';
import { config } from '$stores/config';
import _ from 'lodash';

const defaultConfig: Config = {
	logs: {
		debug: true,
		saveToFile: true,
	},
	input: {
		holdToActivate: true,
		keyboardShortcuts: [
			{
				outputPrefix: null,
				shortcut: ['win', 'h'],
			},
		],
		autoRelease: {
			enabled: false,
			releaseTime: 60,
		},
	},
	output: {
		partial: false,
		animated: false,
		typingDelay: 50,
	},
	enableSounds: true,
	feedback: {
		speech: {
			enabled: true,
			volume: 0.5,
		},
		language: 'en',
	},
	speechRecognition: {
		language: 'hu-HU',
		customWordsAndPhrases: [],
	},
	replacers: {
		punctuationMarks: true,
		gameChatPrefixes: false,
	},
	windowAllowList: {
		enabled: false,
		windows: [],
	},
	commands: {
		enabled: true,
		prefix: '!',
		splitter: ':',
	},
	others: {
		mtaConsoleInputMode: false,
		showActiveButtons: false,
	},
};

function patchConfig(newConfig: { [x: string]: any }, oldConfig: { [x: string]: any }, defaultConfig: object) {
	for (let [key, value] of Object.entries(defaultConfig)) {
		if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
			Object.assign(newConfig, { [key]: patchConfig({}, oldConfig[key] ?? {}, value) });
		} else if (!(key in oldConfig)) {
			newConfig[key] = value;
		} else {
			newConfig[key] = oldConfig[key];
		}
	}

	return newConfig;
}

export function loadConfig() {
	const rawConfig = window.localStorage.getItem('config');
	const loadedConfig = rawConfig ? JSON.parse(rawConfig) : defaultConfig;
	const patchedConfig = patchConfig({}, loadedConfig, defaultConfig) as Config;

	if (!_.isEqual(loadedConfig, patchedConfig)) {
		window.localStorage.setItem('config', JSON.stringify(patchedConfig));
	}

	config.set(patchedConfig);
}
