import { existsSync } from 'fs';
import { resolve } from 'path';

import { __app } from './app.js';

// import { fullArchive } from 'node-7z-archive';
const { fullArchive } = require('node-7z-archive');

async function uncompress7zChrome() {
	const chrome7zPath = resolve('./resources/chrome.7z');

	if (!existsSync(chrome7zPath)) return;

	const chrome7zOutputPath = resolve('./resources');

	await fullArchive(chrome7zPath, chrome7zOutputPath);
}

export async function firstStart() {
	if (__app.isDev) return;

	await uncompress7zChrome();

	__app.config.update.firstStart = false;
}
