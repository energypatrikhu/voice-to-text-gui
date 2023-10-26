export function timeToSec(timeStr: string) {
	return timeStr
		.split(':')
		.reverse()
		.map((n, i) => (i != 0 ? Number(n) * 60 ** i : Number(n)))
		.reduce((a, b) => a + b);
}
