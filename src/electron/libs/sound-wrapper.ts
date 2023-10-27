import { __app } from './app.js';

export function soundWrapper() {
	try {
		if (!__app.config.enableSounds) {
			return;
		}
		__app.console.debugLog(__app.dictionary.textFeedback.soundWrapper.playingSound);
		process.stdout.write('\x07');
	} catch (error) {
		__app.console.debugErrorLog(error);
	}
}
