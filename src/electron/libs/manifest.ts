import { __app } from './app.js';
import { loadJson, saveJson } from './json-storage.js';

import type { Manifest } from '../../types/electron/Manifest.js';

const defaultManifest: Manifest = {
	isFirstStart: true,
	chromeVersion: '',
};

export async function loadManifest() {
	const savedManifest = await loadJson<Manifest>('manifest');
	const loadedManifest = savedManifest ?? defaultManifest;

	if (!loadedManifest) {
		await saveJson('manifest', loadedManifest);
	}

	return loadedManifest;
}

export async function saveManifest(manifest: Partial<Manifest>) {
	const loadedManifest = __app.manifest ?? defaultManifest;
	__app.manifest = { ...loadedManifest, ...manifest };
	await saveJson('manifest', __app.manifest);
}
