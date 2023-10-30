import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';

import type { Dictionary } from '../../types/Dictionary.js';

export async function loadDictionary(language: string, isDev: boolean): Promise<Dictionary> {
	const dictionaryPath = resolve(join(isDev ? './resources/extraResources' : './resources', 'dictionaries'));

	if (existsSync(dictionaryPath)) {
		return JSON.parse(await readFile(join(dictionaryPath, `/${language}.json`), 'utf-8'));
	}

	return JSON.parse(await readFile(join(dictionaryPath, `/en.json`), 'utf-8'));
}
