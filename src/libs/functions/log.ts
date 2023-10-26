import { saveToLogFile } from '$libs/functions/saveToLogFile';

export function log(...messages: any) {
	saveToLogFile('::normal::', ...messages);
}

export function logLine(...messages: any) {
	log('');
	log(...messages);
}
