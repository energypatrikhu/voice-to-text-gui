import { log } from '$libs/functions/log';
import { config } from '$stores/config';
import { dict } from '$stores/dict';
import { get } from 'svelte/store';

export async function loadDictonary() {
	const lang = get(config).feedback.language;

	log({ lang });

	if (['hu', 'en'].includes(lang)) {
		dict.set((await import(`../json/langs/${lang}.json`)).default);
		return;
	}

	dict.set((await import(`../json/langs/en.json`)).default);
}

export function textReplacer(text: string, ...replacers: any[]) {
	for (let [index, replacer] of replacers.entries()) {
		text = text.replace(`{${index}}`, replacer);
	}
	return text;
}
