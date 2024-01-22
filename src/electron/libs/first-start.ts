import AdmZip from 'adm-zip';
import { existsSync } from 'fs';
import { rm } from 'fs/promises';
import { resolve } from 'path';

import { __app } from './app.js';

async function uncompressChrome() {
	try {
		const chromeZipPath = resolve('./resources/chrome.zip');

		if (!existsSync(chromeZipPath)) return;

		__app.console.log(__app.translations.firstStart.chrome.run);

		const chromeZipOutputPath = resolve('./resources');

		const zip = new AdmZip(chromeZipPath);

		zip.extractAllTo(chromeZipOutputPath);

		await rm(chromeZipPath, { force: true, recursive: true });
		__app.console.log(__app.translations.firstStart.chrome.done);
	} catch (error: any) {
		__app.console.errorLog(__app.translations.firstStart.chrome.fail);
		__app.console.debugErrorLog(error.message ?? error);
		throw error;
	}
}

export async function firstStart() {
	if (__app.isDev) return;

	await uncompressChrome();

	__app.config.update.firstStart = false;
}
