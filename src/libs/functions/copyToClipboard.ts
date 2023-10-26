export function copyToClipboard(text: string | number) {
	let _text = String(text);

	if (navigator) {
		return navigator.clipboard.writeText(_text);
	}

	let tmp = globalThis.document.createElement('INPUT') as HTMLInputElement;
	globalThis.document.body.appendChild(tmp);
	tmp.value = _text;
	tmp.select();
	globalThis.document.execCommand('copy');
	tmp.remove();
}
