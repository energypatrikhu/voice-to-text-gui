// @ts-ignore
import moment from 'moment/min/moment-with-locales.min';

let userLang = globalThis.navigator && globalThis.navigator.language;
moment.locale((userLang ?? 'hu').split('-')[0]);

export function formatDate(date: number) {
	return moment(Number(date)).format('LLLL');
}

export { moment };
