import { needZero } from '$libs/functions/needZero';

export function secToTime(sec: number, format: string = '{HH}:{MM}:{SS}') {
	sec = Math.max(sec, 0);
	let days = Math.floor(sec / (60 ** 2 * 24));
	let hours = Math.floor((sec % (60 ** 2 * 24)) / 60 ** 2);
	let minutes = Math.floor((sec % 60 ** 2) / 60);
	let seconds = Math.floor(sec % 60);

	let formats: any = {
		D: days,
		H: hours,
		M: minutes,
		S: seconds,
	};
	let types = format.match(/\{(D{1,}|H{1,}|M{1,}|S{1,})\}/g);
	for (let _type of types!) {
		let type = _type.substring(1, _type.length - 1);
		format = format.replace(_type, needZero(formats[type[0]], type.length));
	}
	return format;
}
