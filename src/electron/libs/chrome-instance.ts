import { join, resolve } from 'path';
import { launch } from 'puppeteer-core';

import { __app } from './app.js';

class ChromeInstance {
	async init() {
		const chromeInstance = await launch({
			headless: 'new',
			executablePath: resolve(join(__app.isDev ? './resources/extraResources' : './resources', 'chrome/chrome.exe')),
		});

		const page = (await chromeInstance.pages())[0];

		await page.goto('chrome://version//');

		return page;
	}
}

export { ChromeInstance };
