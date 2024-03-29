import { browser } from '$app/environment';
import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { ConfigOptions } from '$types/ConfigOptions';

export const config = <Writable<ConfigOptions>>writable({});

let isReady = false;

export function setReady(state: boolean) {
	isReady = state;

	console.log('setReady', { isReady });
}

config.subscribe(function (values) {
	console.log({ browser, isReady });

	if (browser && isReady) {
		window.electron.send('electron', {
			event: 'config',
			data: values,
		});
	}
});
