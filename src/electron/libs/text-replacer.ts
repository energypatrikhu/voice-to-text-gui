export function textReplacer(text: string, ...replacers: any[]) {
	for (let [index, replacer] of replacers.entries()) {
		text = text.replace(`{${index}}`, replacer);
	}
	return text;
}
