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

export function loadMacros() {
  const savedMacros = loadJson<Array<Macro>>('macros');
  const loadedMacros = savedMacros ?? defaultMacros;

  if (!savedMacros) {
    saveJson('macros', loadedMacros);
  }

  if (Object.keys(loadedMacros).length !== Object.keys(defaultMacros).length) {
    saveJson('macros', migrateMacros(loadedMacros));
  }

  return loadedMacros;
}

export function saveMacros(macros: Array<Macro>) {
  saveJson('macros', macros);
  __app.settingsUpdate.send('macros');
}
