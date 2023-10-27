import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';

import type { Dictionary } from '../../types/Dictionary.js';

export async function loadDictionary(language: string, isDev: boolean): Promise<Dictionary> {
	const dictionaryPath = resolve(isDev ? './resources/extraResources/dictionaries' : './resources/dictionaries');

	// console.log('0:', resolve('.'));
	// console.log('1:', resolve(dictionaryPath));

	if (existsSync(dictionaryPath)) {
		return JSON.parse(readFileSync(join(dictionaryPath, `/${language}.json`), 'utf-8'));
	}

	return JSON.parse(readFileSync(join(dictionaryPath, `/en.json`), 'utf-8'));
}
