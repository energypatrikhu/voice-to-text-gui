import { app } from 'electron';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

export function saveJson(name: string, data: any) {
	const userDataFolder = process.env.NODE_ENV == 'dev' ? resolve('./local') : join(app.getPath('userData'), app.name);

	if (!existsSync(userDataFolder)) {
		mkdirSync(userDataFolder, { recursive: true });
	}

	writeFileSync(join(userDataFolder, `${name}.json`), JSON.stringify(data), 'utf8');
}

export function loadJson<T>(name: string): T | null {
	const userDataFolder = process.env.NODE_ENV == 'dev' ? resolve('./local') : join(app.getPath('userData'), app.name);

	if (!existsSync(join(userDataFolder, `${name}.json`))) {
		return null;
	}

	const content = readFileSync(join(userDataFolder, `${name}.json`), 'utf8');
	return content ? JSON.parse(content) : null;
}
