export function needZero(num: number, placeholders: number = 0) {
	return '0'.repeat(placeholders - (placeholders > 1 ? String(num).length : 1)) + num;
}
