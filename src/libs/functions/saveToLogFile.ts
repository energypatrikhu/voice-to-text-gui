import { dateToLocale } from '$libs/functions/dateToLocale';
import { app } from '$stores/app';
import { config } from '$stores/config';
import { cDebugLog, cError, cLog } from '$stores/console';
import { get } from 'svelte/store';

export function saveToLogFile(type: '::debug::' | '::normal::', ...messages: Array<any>) {
	const msgData = type === '::normal::' ? cLog(...messages) : type === '::debug::' ? cDebugLog(...messages) : cError('Wrong log type!');

	if (messages.length > 0 && get(config).logs.saveToFile) {
		const filename = get(app).startupDate + '.log';

		window.electron.send('electron', {
			event: 'log',
			// event: 'log',
			data: { filename, ...msgData, timestamp: dateToLocale(msgData.timestamp) },
			// data: { filename, ...msgData, timestamp: dateToLocale(msgData.timestamp) },
		});
	}
}
