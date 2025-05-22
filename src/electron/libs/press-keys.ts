import { __app } from "./app.js";

export async function printTextSegments(
  output: string,
  isCommand: boolean = false,
  isMacro: boolean = false,
) {
  try {
    if (output === "") {
      return;
    }

    const outputSegments = output.match(/\S.{1,90}(?=\s|$)/g);

    for (const _output of outputSegments!) {
      if ((__app.config.others.mtaConsoleInputMode || isCommand) && !isMacro) {
        await sendKey("f8");
      }

      await printText(_output);

      if ((__app.config.others.mtaConsoleInputMode || isCommand) && !isMacro) {
        await sendKeys(["enter", "f8"]);
      }
    }
  } catch (error) {
    __app.console.debugErrorLog(error);
  }
}

export async function printText(text: string) {
  try {
    const delay = __app.config.output.animated
      ? __app.config.output.typingDelay
      : 0;

    await __app.hardware.keyboard.printText(text, delay, delay);
  } catch (error) {
    __app.console.debugErrorLog(error);
  }
}

export async function sendKey(key: string) {
  try {
    const delay = __app.config.output.animated
      ? __app.config.output.typingDelay
      : 0;

    await __app.hardware.keyboard.sendKey(key as any, delay, delay);
  } catch (error) {
    __app.console.debugErrorLog(error);
  }
}

export async function sendKeys(keys: string[]) {
  try {
    const delay = __app.config.output.animated
      ? __app.config.output.typingDelay
      : 0;

    await __app.hardware.keyboard.sendKeys(keys as any, delay, delay);
  } catch (error) {
    __app.console.debugErrorLog(error);
  }
}
