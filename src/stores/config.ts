import { browser } from '$app/environment';
import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { ConfigOptions } from '$types/ConfigOptions';

export const config = <Writable<ConfigOptions>>writable({});

config.subscribe(function (values) {
	if (browser) {
		window.localStorage.setItem('config', JSON.stringify(values));
	}
});
