import { debugLogLine } from '$libs/functions/debugLog.js';
import { logLine } from '$libs/functions/log.js';
import { config } from '$stores/config.js';
import { dict } from '$stores/dict';
import { get } from 'svelte/store';

export default function soundWrapper() {
	try {
		if (!get(config).enableSounds) {
			return;
		}
		debugLogLine(get(dict).textFeedback.soundWrapper.playingSound);
		process.stdout.write('\x07');
	} catch (error) {
		logLine(error);
	}
}
