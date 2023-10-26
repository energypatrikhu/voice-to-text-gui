import { shuffle } from '$libs/functions/shuffle';

export function mkstr(customChars: string, chars = 16) {
	let rndStr = '';
	for (let i = 0; i < chars; i++) {
		rndStr += shuffle(customChars)[Math.round(Math.random() * (customChars.length - 1))];
	}
	return rndStr;
}
