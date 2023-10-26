export function countdown(cb: any, timeout: number, statusUpdate?: any) {
	let counted = 1;
	let counter = setInterval(() => {
		if (statusUpdate) {
			let timeRemaining = timeout / 1000 - counted;
			if (timeRemaining > 0) {
				statusUpdate(timeRemaining);
			}
		}
		counted++;
	}, 1000);

	setTimeout(() => {
		cb();
		clearInterval(counter);
	}, timeout);
}
