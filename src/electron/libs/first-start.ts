import AdmZip from 'adm-zip';
import { existsSync } from 'fs';
import { resolve } from 'path';

import { __app } from './app.js';

function uncompressChrome() {
	const chromeZipPath = resolve('./resources/chrome.zip');

	if (!existsSync(chromeZipPath)) return;

	const chromeZipOutputPath = resolve('./resources');

	const zip = new AdmZip(chromeZipPath);

	zip.extractAllTo(chromeZipOutputPath);
}

export async function firstStart() {
	if (__app.isDev) return;

	uncompressChrome();

	__app.config.update.firstStart = false;
}
