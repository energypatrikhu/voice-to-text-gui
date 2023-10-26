import { shuffle } from '$libs/functions/shuffle';
import { allChars } from '$libs/functions/variables';

export function rndstr(chars = 16) {
	let rndStr = '';
	for (let i = 0; i < chars; i++) {
		rndStr += shuffle(allChars)[Math.round(Math.random() * (allChars.length - 1))];
	}
	return rndStr;
}
