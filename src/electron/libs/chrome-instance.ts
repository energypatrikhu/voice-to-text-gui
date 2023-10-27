import { resolve } from 'path';
import { launch } from 'puppeteer-core';

class ChromeInstance {
	private isDev;

	constructor(isDev: boolean) {
		this.isDev = isDev;
	}

	async init() {
		console.log(resolve('.'));

		const chromeInstance = await launch({
			headless: 'new',
			executablePath: this.isDev ? './resources/extraResources/chrome/chrome.exe' : './resources/chrome/chrome.exe',
		});

		const page = (await chromeInstance.pages())[0];

		await page.goto('chrome://version//');

		return page;
	}
}

export { ChromeInstance };