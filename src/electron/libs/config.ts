import _ from 'lodash';

import { loadJson, saveJson } from './json-storage.js';

import type { ConfigOptions } from '../../types/ConfigOptions.js';

const defaultConfig: ConfigOptions = {
	logs: {
		debug: true,
		saveToFile: true,
	},
	input: {
		holdToActivate: true,
		keyboardShortcuts: [
			{
				outputPrefix: null,
				shortcut: ['mouse5'],
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
	feedback: {
		sounds: false,
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
	const savedConfig = loadJson<ConfigOptions>('config');
	const loadedConfig = savedConfig ?? defaultConfig;
	const patchedConfig = patchConfig({}, loadedConfig, defaultConfig) as ConfigOptions;

	if (!_.isEqual(loadedConfig, patchedConfig) || !savedConfig) {
		saveJson('config', patchedConfig);
	}

	return patchedConfig;
}

export function saveConfig(config: ConfigOptions) {
	saveJson('config', config);
}
