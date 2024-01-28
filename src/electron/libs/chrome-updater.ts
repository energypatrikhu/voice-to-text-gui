import axios from 'axios';
import { createWriteStream, existsSync } from 'fs';
import { rename, rm } from 'fs/promises';
import { join } from 'path';

import { parseXml } from '@rgrove/parse-xml';

import { extractArchive } from './7z.js';
import { __app } from './app.js';
import { saveManifest } from './manifest.js';

async function cleanupChromeFiles() {
	if (existsSync(join(__app.resources, 'chrome'))) {
		await rm(join(__app.resources, 'chrome'), { force: true, recursive: true });
	}
	if (existsSync(join(__app.resources, 'Chrome-bin'))) {
		await rm(join(__app.resources, 'Chrome-bin'), { force: true, recursive: true });
	}
	if (existsSync(join(__app.resources, 'chrome-installer.exe'))) {
		await rm(join(__app.resources, 'chrome-installer.exe'), { force: true, recursive: true });
	}
	if (existsSync(join(__app.resources, 'chrome.7z'))) {
		await rm(join(__app.resources, 'chrome.7z'), { force: true, recursive: true });
	}
}

function getLatestChrome() {
	try {
		__app.console.log(__app.translations.firstStart.chrome.check);

		const updateUrl = 'https://update.googleapis.com/service/update2';
		const updateXML = `<?xml version="1.0" encoding="UTF-8"?><request protocol="3.0"><os platform="win" version="10.0.22635.3061" arch="x64"/><app appid="{8A69D345-D564-463C-AFF1-A69D9E530F96}" version=""><updatecheck/></app></request>`;

		const axiosResponse = axios({
			url: updateUrl,
			method: 'POST',
			headers: {
				'Content-Type': 'application/xml',
				'User-Agent': 'Google Update/1.3.36.352;winhttp;cup-ecdsa',
				'X-Goog-Update-AppId': '{8A69D345-D564-463C-AFF1-A69D9E530F96}',
				'X-Goog-Update-Updater': 'Omaha-1.3.36.352',
			},
			data: updateXML,
			responseType: 'text',
		});

		return new Promise<{
			urls: Array<string>;
			version: string;
			filename: string;
			filesize: number;
		}>((promiseResolve) => {
			axiosResponse.then(function (_response) {
				const parsedXml: any = parseXml(_response.data).toJSON();

				const xml_response = parsedXml.children[0];

				const xml_app = xml_response.children[1];

				const xml_updatecheck = xml_app.children[0];

				const xml_urls = xml_updatecheck.children[0];
				const xml_url = xml_urls.children.map((_url: any) => _url.attributes.codebase);

				const xml_manifest = xml_updatecheck.children[1];
				const xml_version = xml_manifest.attributes.version;

				const xml_packages = xml_manifest.children[1];

				const xml_package = xml_packages.children[0];
				const xml_name = xml_package.attributes.name;
				const xml_size = xml_package.attributes.size;

				promiseResolve({
					urls: xml_url,
					version: xml_version,
					filename: xml_name,
					filesize: xml_size,
				});
			});
		});
	} catch (error: any) {
		__app.console.errorLog(__app.translations.firstStart.chrome.fail);
		__app.console.debugErrorLog(error.message ?? error);
		throw error;
	}
}

async function chromeDownloader() {
	try {
		const chromeData = await getLatestChrome();
		const chromeFilePath = join(__app.resources, 'chrome-installer.exe');

		if (chromeData.version === __app.manifest.chromeVersion) {
			return { filename: chromeFilePath, version: chromeData.version };
		}

		__app.console.log(__app.translations.firstStart.chrome.update);

		await cleanupChromeFiles();

		return new Promise<{ filename: string; version: string }>(async (promiseResolve) => {
			for (const chromeDownloadUrl of chromeData.urls) {
				const axiosResponse = await axios({
					url: join(chromeDownloadUrl, chromeData.filename),
					method: 'GET',
					headers: {
						'User-Agent': 'Google Update/1.3.36.352;winhttp;cup-ecdsa',
					},
					responseType: 'stream',
				});

				let chromeFileStream = createWriteStream(chromeFilePath);
				axiosResponse.data.pipe(chromeFileStream);

				chromeFileStream.on('finish', async function () {
					chromeFileStream.close();

					promiseResolve({ filename: chromeFilePath, version: chromeData.version });
				});

				if (axiosResponse.status !== 404) {
					return;
				}
			}
		});
	} catch (error: any) {
		__app.console.errorLog(__app.translations.firstStart.chrome.fail);
		__app.console.debugErrorLog(error.message ?? error);
		throw error;
	}
}

export async function chromeUpdater() {
	try {
		const chromeData = await chromeDownloader();

		if (chromeData.version === __app.manifest.chromeVersion) {
			__app.console.log(__app.translations.firstStart.chrome.no_update);
			return;
		}

		await extractArchive(chromeData.filename);

		await rm(chromeData.filename, { force: true, recursive: true });

		await extractArchive('chrome.7z');

		const chromePath = join(__app.resources, 'chrome');

		await rename(join(__app.resources, 'Chrome-bin'), chromePath);

		for (const item of ['chrome_proxy.exe']) {
			await rm(join(chromePath, item), { force: true, recursive: true });
		}

		for (const item of ['default_apps', 'Extensions', 'MEIPreload', 'VisualElements', 'WidevineCdm', 'notification_helper.exe']) {
			await rm(join(chromePath, chromeData.version, item), { force: true, recursive: true });
		}

		await saveManifest({ chromeVersion: chromeData.version });

		__app.console.log(__app.translations.firstStart.chrome.done);
	} catch (error: any) {
		__app.console.errorLog(__app.translations.firstStart.chrome.fail);
		__app.console.debugErrorLog(error.message ?? error);
		throw error;
	}
}
