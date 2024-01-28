import { __app } from './app.js';
import { saveManifest } from './manifest.js';

export async function firstStart() {
	if (__app.isDev) return;

	await saveManifest({ isFirstStart: false });
}
