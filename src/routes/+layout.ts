import type { Load } from '@sveltejs/kit';
import { loadConfig } from '$libs/functions/config';
import { loadDictonary } from '$libs/functions/dict';
import { getLocaleTime } from '$libs/functions/getLocaleTime';
import { loadMacros } from '$libs/functions/macros';
import { preloadSvgs } from '$libs/functions/preloadSvgs';
import { app } from '$stores/app';

export const prerender = true;
export const ssr = false;

export let load: Load = async ({ data, parent }) => {
	console.log('\n');

	console.log(`waiting parent`);
	await parent();

	console.log(`setting up 'startupDate'`);
	app.update(function (_app) {
		_app.startupDate = getLocaleTime();
		return _app;
	});

	console.log(`preload svgs`);
	await preloadSvgs();

	console.log(`load config`);
	loadConfig();

	console.log(`load macros`);
	loadMacros();

	console.log(`load dictonary`);
	await loadDictonary();

	return data;
};
