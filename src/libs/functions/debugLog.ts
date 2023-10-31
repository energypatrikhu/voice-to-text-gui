import { saveToLogFile } from '$libs/functions/saveToLogFile';
import { config } from '$stores/config';
import { get } from 'svelte/store';

export function debugLog(...messages: any) {
	if (!get(config).logs.debug) return;
	saveToLogFile('::debug::', ...messages);
}
