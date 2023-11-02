import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';

import { __app } from './app.js';

import type { Dictionary } from '../../types/Dictionary.js';
export async function loadDictionary(): Promise<Dictionary> {
	const dictionaryPath = resolve(join(__app.isDev ? './resources/extraResources' : './resources', 'dictionaries'));

	if (existsSync(join(dictionaryPath, `/${__app.config.feedback.language}.json`))) {
		return JSON.parse(await readFile(join(dictionaryPath, `/${__app.config.feedback.language}.json`), 'utf-8'));
	}

	return JSON.parse(await readFile(join(dictionaryPath, `/en.json`), 'utf-8'));
}
