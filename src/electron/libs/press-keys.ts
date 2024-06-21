import type { KeyboardButton } from 'keysender';
import { __app } from './app.js';
import { keyboard } from './hardware.js';

export async function printText(output: string, isCommand: boolean = false, isMacro: boolean = false) {
  try {
    if (output === '') {
      return;
    }

    const outputSegments = output.match(/\S.{1,90}(?=\s|$)/g);
    const delay = __app.config.output.animated ? __app.config.output.typingDelay : 0;

    for (const _output of outputSegments!) {
      if ((__app.config.others.mtaConsoleInputMode || isCommand) && !isMacro) {
        await sendKeys('f8');
      }

      await keyboard.printText(_output, delay, delay);

      if ((__app.config.others.mtaConsoleInputMode || isCommand) && !isMacro) {
        await sendKeys('enter', 'f8');
      }
    }
  } catch (error) {
    __app.console.debugErrorLog(error);
  }
}

export async function sendKeys(...keys: KeyboardButton[]) {
  try {
    if (keys.length === 0) {
      return;
    }

    const delay = __app.config.output.animated ? __app.config.output.typingDelay : 0;

    await keyboard.sendKeys(keys, delay, delay);
  } catch (error) {
    __app.console.debugErrorLog(error);
  }
}
