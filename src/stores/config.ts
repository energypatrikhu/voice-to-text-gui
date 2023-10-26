import { browser } from '$app/environment';
import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { Config } from '$types/Config';

export const config = <Writable<Config>>writable({});

config.subscribe(function (values) {
	if (browser) {
		window.localStorage.setItem('config', JSON.stringify(values));
	}
});
