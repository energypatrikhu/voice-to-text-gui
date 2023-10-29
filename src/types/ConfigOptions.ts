import type { KeyboardShortcut } from '$types/KeyboardShortcut';

export interface ConfigOptions {
	logs: {
		debug: boolean;
		saveToFile: boolean;
	};
	input: {
		holdToActivate: boolean;
		keyboardShortcuts: Array<KeyboardShortcut>;
		autoRelease: {
			enabled: boolean;
			releaseTime: number;
		};
	};
	output: {
		partial: boolean;
		animated: boolean;
		typingDelay: number;
	};
	feedback: {
		sounds: boolean;
		speech: {
			enabled: boolean;
			volume: number;
		};
		language: 'hu' | 'en';
	};
	speechRecognition: {
		language: 'hu-HU' | 'en-US' | 'en-GB';
		customWordsAndPhrases: Array<string>;
	};
	replacers: {
		punctuationMarks: boolean;
		gameChatPrefixes: boolean;
	};
	windowAllowList: {
		enabled: boolean;
		windows: Array<string>;
	};
	commands: {
		enabled: boolean;
		prefix: string;
		splitter: string;
	};
	others: {
		mtaConsoleInputMode: boolean;
		showActiveButtons: boolean;
	};
}
