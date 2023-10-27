import type { Macro } from '../../types/Macro.js';
import { loadJson, saveJson } from './json-storage.js';

const defaultMacros: Array<Macro> = [
	{
		handler: 'teszt',
		text: "Ez egy teszt makró, mely kiírja a 'szépnapot' makrót: {!makró:szépnapot}",
	},
	{
		handler: 'szépnapot',
		text: 'Szép napot kívánok, hogy tetszik lenni?',
	},
];

export function loadMacros() {
	const savedMacros = loadJson<Array<Macro>>('macros');
	const loadedMacros = savedMacros ?? defaultMacros;

	if (!savedMacros) {
		saveJson('macros', loadedMacros);
	}

	return loadedMacros;
}

export function saveMacros(macros: Array<Macro>) {
	saveJson('macros', macros);
}
