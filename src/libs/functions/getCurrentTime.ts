import moment from 'moment';

export function getCurrentTime() {
	return moment().unix();
}
