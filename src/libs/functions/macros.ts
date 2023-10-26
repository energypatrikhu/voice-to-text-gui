import type { Macro } from '$types/Macro';
import { macros } from '$stores/macros';

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
	const rawMacros = window.localStorage.getItem('macros');
	const loadedMacros = rawMacros ? JSON.parse(rawMacros) : defaultMacros;

	if (!rawMacros) {
		window.localStorage.setItem('macros', JSON.stringify(defaultMacros));
	}

	macros.set(loadedMacros);
}
