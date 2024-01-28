import { __app } from './app.js';
import { chromeUpdater } from './chrome-updater.js';
import { saveManifest } from './manifest.js';

export async function firstStart() {
	if (__app.isDev) return;

	await chromeUpdater();

	await saveManifest({ isFirstStart: true });
}
