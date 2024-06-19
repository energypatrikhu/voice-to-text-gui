import type { KeyboardButton } from 'keysender';
import { __app } from './app.js';
import { keyboard } from './hardware.js';

export function printText(output: string, isCommand: boolean = false, isMacro: boolean = false) {
  return new Promise<void>(async (resolve) => {
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

      setTimeout(resolve, 0);
    } catch (error) {
      __app.console.debugErrorLog(error);
    }
  });
}

export function sendKeys(...keys: KeyboardButton[]) {
  return new Promise<void>(async (resolve) => {
    try {
      if (keys.length === 0) {
        setTimeout(resolve, 0);
        return;
      }

      const delay = __app.config.output.animated ? __app.config.output.typingDelay : 0;

      await keyboard.sendKeys(keys, delay, delay);

      setTimeout(resolve, 0);
    } catch (error) {
      __app.console.debugErrorLog(error);
    }
  });
}
