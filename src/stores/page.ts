import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';

export const pageInfo: Writable<any> = writable(null);

export const pageSettings = writable({
	common: {
		nav: {
			color: 'text-white',
			bgColor: 'bg-neutral-700',
		},
		body: {
			color: 'text-white',
			bgColor: 'bg-neutral-800',
		},
		accent: {
			rounding: 'rounded-md',
			bgColor: 'bg-transparent',
			hoverBgColor: 'hover:bg-green-600/50',
			activeBgColor: 'bg-green-600/25',
		},
	},
	amoled: {
		enabled: false,
		nav: {
			bgColor: 'bg-black',
		},
		main: {
			bgColor: 'bg-black',
		},
	},
});
