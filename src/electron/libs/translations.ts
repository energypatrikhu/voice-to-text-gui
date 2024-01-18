import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';

import { __app } from './app.js';

import type { Translations } from '../../types/Translations.js';

export async function loadTranslation(): Promise<Translations> {
	const translationPath = resolve(join(__app.isDev ? './resources/extraResources' : './resources', 'translationsionaries'));

	if (existsSync(join(translationPath, `/${__app.config.feedback.language}.json`))) {
		return JSON.parse(await readFile(join(translationPath, `/${__app.config.feedback.language}.json`), 'utf-8'));
	}

	return JSON.parse(await readFile(join(translationPath, `/en.json`), 'utf-8'));
}
