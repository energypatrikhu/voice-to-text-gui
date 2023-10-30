export function textReplacer(text: string, ...replacers: any[]) {
	for (const [index, replacer] of replacers.entries()) {
		text = text.replace(`{${index}}`, replacer);
	}
	return text;
}
