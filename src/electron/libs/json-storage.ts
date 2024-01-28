import { existsSync } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

import { __app } from './app.js';

export async function saveJson(name: string, data: any) {
	const userDataFolder = process.env.NODE_ENV === 'dev' ? resolve('./local') : __app.userDataFolder;

	if (!existsSync(userDataFolder)) {
		await mkdir(userDataFolder, { recursive: true });
	}

	await writeFile(join(userDataFolder, `${name}.json`), JSON.stringify(data), 'utf8');
}

export async function loadJson<T>(name: string): Promise<T | null> {
	try {
		const userDataFolder = process.env.NODE_ENV === 'dev' ? resolve('./local') : __app.userDataFolder;

		if (!existsSync(join(userDataFolder, `${name}.json`))) {
			return null;
		}

		const content = await readFile(join(userDataFolder, `${name}.json`), 'utf8');
		return content ? JSON.parse(content) : null;
	} catch {
		return null;
	}
}
