import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';

import { __app } from './app.js';

import type { Translations } from '../../types/Translations.js';

export async function loadTranslation(): Promise<Translations> {
  const translationsPath = resolve(join(__app.isDev ? './resources/extraResources' : './resources', 'translations'));

  if (existsSync(join(translationsPath, `/${__app.config.feedback.language}.json`))) {
    return JSON.parse(await readFile(join(translationsPath, `/${__app.config.feedback.language}.json`), 'utf-8'));
  }

  return JSON.parse(await readFile(join(translationsPath, `/en.json`), 'utf-8'));
}
