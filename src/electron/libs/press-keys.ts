import type { KeyboardButton } from 'keysender';
import { __app } from './app.js';
import { keyboard } from './hardware.js';

export async function printTextSegments(output: string, isCommand: boolean = false, isMacro: boolean = false) {
  try {
    if (output === '') {
      return;
    }

    const outputSegments = output.match(/\S.{1,90}(?=\s|$)/g);

    for (const _output of outputSegments!) {
      if ((__app.config.others.mtaConsoleInputMode || isCommand) && !isMacro) {
        await sendKey('f8');
      }

      await printText(_output);

      if ((__app.config.others.mtaConsoleInputMode || isCommand) && !isMacro) {
        await sendKeys(['enter', 'f8']);
      }
    }
  } catch (error) {
    __app.console.debugErrorLog(error);
  }
}

export async function printText(text: string) {
  try {
    const delay = __app.config.output.animated ? __app.config.output.typingDelay : 0;
    await keyboard.printText(text, delay, delay);
  } catch (error) {
    __app.console.debugErrorLog(error);
  }
}

export async function sendKey(key: KeyboardButton | string) {
  try {
    const delay = __app.config.output.animated ? __app.config.output.typingDelay : 0;
    await keyboard.sendKey(key as KeyboardButton, delay, delay);
  } catch (error) {
    __app.console.debugErrorLog(error);
  }
}

export async function sendKeys(keys: KeyboardButton[] | string[]) {
  try {
    const delay = __app.config.output.animated ? __app.config.output.typingDelay : 0;
    await keyboard.sendKeys(keys as KeyboardButton[], delay, delay);
  } catch (error) {
    __app.console.debugErrorLog(error);
  }
}
