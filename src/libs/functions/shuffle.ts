export function shuffle(string: string) {
	let a = string.split('');
	for (let i = a.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
	return a.join('');
}
