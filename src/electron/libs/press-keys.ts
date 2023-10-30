import type { KeyboardButton } from 'keysender';
import { __app } from './app.js';
import { keyboard } from './hardware.js';

export function printText(output: string, isCommand: boolean = false) {
	return new Promise<void>(async (resolve) => {
		try {
			if (output === '') {
				return;
			}

			const delay = __app.config.output.animated ? __app.config.output.typingDelay : 0;

			if (__app.config.others.mtaConsoleInputMode || isCommand) {
				await keyboard.sendKey('f8', delay, delay);
				await keyboard.printText(output, delay, delay);
				await keyboard.sendKeys(['enter', 'f8'], delay, delay);
			} else {
				await keyboard.printText(output, delay, delay);
			}

			setTimeout(resolve, 0);
		} catch (error) {
			__app.console.debugErrorLog(error);
		}
	});
}

export function sendKeys(...key: KeyboardButton[]) {
	return new Promise<void>(async (resolve) => {
		try {
			if (!key) {
				return;
			}

			const delay = __app.config.output.animated ? __app.config.output.typingDelay : 0;

			await keyboard.sendKeys(key, delay, delay);

			setTimeout(resolve, 0);
		} catch (error) {
			__app.console.debugErrorLog(error);
		}
	});
}
