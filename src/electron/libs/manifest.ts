import { __app } from './app.js';
import { loadJson, saveJson } from './json-storage.js';

import type { Manifest } from '../../types/electron/Manifest.js';

const defaultManifest: Manifest = {
  isFirstStart: true,
  chromeVersion: '',
};

export function loadManifest() {
  const savedManifest = loadJson<Manifest>('manifest');
  const loadedManifest = savedManifest ?? defaultManifest;

  if (!loadedManifest) {
    saveJson('manifest', loadedManifest);
  }

  return loadedManifest;
}

export function saveManifest(manifest: Partial<Manifest>) {
  const loadedManifest = __app.manifest ?? defaultManifest;
  __app.manifest = { ...loadedManifest, ...manifest };
  saveJson('manifest', __app.manifest);
  __app.console.debugLog('Manifest updated!');
  __app.console.debugLogJson(__app.manifest);
}
