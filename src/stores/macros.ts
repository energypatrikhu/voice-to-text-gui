import { browser } from '$app/environment';
import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { Macro } from '$types/Macro';

export const macros = <Writable<Array<Macro>>>writable([]);

macros.subscribe(function (values) {
	if (browser) {
		window.localStorage.setItem('macros', JSON.stringify(values));
	}
});
