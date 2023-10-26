const { launch } = require('puppeteer-core');
const { resolve } = require('path');

class ChromeInstance {
	isDev;

	/**
	 * @param {boolean} isDev
	 */
	constructor(isDev) {
		this.isDev = isDev;
	}

	async initPage() {
		console.log(resolve('./'));

		try {
			let chromeInstance = await launch({
				headless: 'new',
				executablePath: this.isDev ? './chrome/chrome.exe' : './resources/chrome/chrome.exe',
			});

			let page = (await chromeInstance.pages())[0];

			await page.goto('chrome://version//');

			return page;
		} catch (error) {
			console.error(error);
		}
	}
}

module.exports = { ChromeInstance };
