import { moment } from '$libs/functions/moment';

export function secondsToLongTime(seconds: number, showUnUsed: boolean = true) {
	let eventTime = moment().add('s', seconds);
	let currentTime = moment();
	let duration = moment.duration(eventTime.diff(currentTime));

	return (showUnUsed || duration.years() > 0 ? `${duration.years()} év ` : '') + (showUnUsed || duration.days() > 0 ? `${duration.days()} nap ` : '') + (showUnUsed || duration.hours() > 0 ? `${duration.hours()} óra ` : '') + (showUnUsed || duration.minutes() > 0 ? `${duration.minutes()} perc ` : '') + (showUnUsed || duration.seconds() > 0 ? `${duration.seconds()} másodperc` : '');
}
