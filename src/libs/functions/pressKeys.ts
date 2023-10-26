import type { KeyboardButton } from 'keysender';
import { keyboard } from '$libs/functions/hardware';
import { logLine } from '$libs/functions/log';
import { config } from '$stores/config';
import { get } from 'svelte/store';

export function printText(output: string, isCommand: boolean = false) {
	return new Promise<void>(async (resolve) => {
		try {
			if (output == '') {
				return;
			}

			let delay = get(config).output.animated ? get(config).output.typingDelay : 0;

			if (get(config).others.mtaConsoleInputMode || isCommand) {
				await keyboard.sendKey('f8', delay, delay);
				await keyboard.printText(output, delay, delay);
				await keyboard.sendKeys(['enter', 'f8'], delay, delay);
			} else {
				await keyboard.printText(output, delay, delay);
			}

			setTimeout(resolve, 0);
		} catch (error) {
			logLine(error);
		}
	});
}

export function sendKeys(...key: KeyboardButton[]) {
	return new Promise<void>(async (resolve) => {
		try {
			if (!key) {
				return;
			}

			let delay = get(config).output.animated ? get(config).output.typingDelay : 0;

			await keyboard.sendKeys(key, delay, delay);

			setTimeout(resolve, 0);
		} catch (error) {
			logLine(error);
		}
	});
}
