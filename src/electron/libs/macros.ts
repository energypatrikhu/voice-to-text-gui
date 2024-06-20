import type { Macro } from '../../types/Macro.js';
import { __app } from './app.js';
import { loadJson, saveJson } from './json-storage.js';

const defaultMacros: Array<Macro> = [
  {
    handler: 'teszt',
    prefix: '',
    text: "Ez egy teszt makró, mely kiírja a 'szépnapot' makrót: {!makró:szépnapot}",
  },
  {
    handler: 'szépnapot',
    prefix: '',
    text: 'Szép napot kívánok, hogy tetszik lenni?',
  },
];

function migrateMacros(macros: Array<Macro>) {
  return macros.map((macro) => {
    return {
      handler: macro.handler,
      prefix: '',
      text: macro.text,
    };
  });
}

export async function loadMacros() {
  const savedMacros = await loadJson<Array<Macro>>('macros');
  const loadedMacros = savedMacros ?? defaultMacros;

  if (!savedMacros) {
    await saveJson('macros', loadedMacros);
  }

  if (Object.keys(loadedMacros).length !== Object.keys(defaultMacros).length) {
    await saveJson('macros', migrateMacros(loadedMacros));
  }

  return loadedMacros;
}

export async function saveMacros(macros: Array<Macro>) {
  await saveJson('macros', macros);
  __app.settingsUpdate.send('macros');
}
