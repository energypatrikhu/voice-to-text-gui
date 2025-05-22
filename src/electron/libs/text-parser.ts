import { __app } from "./app.js";
import { cmd } from "./command-handler.js";
import { printTextSegments, sendKey } from "./press-keys.js";

const buttonRemap = {
  "backspace": "backspace",
  "tab": "tab",
  "enter": "enter",
  "capslock": "capslock",
  "escape": "esc",
  "space": "space",
  "pageUp": "pgUp",
  "pageDown": "pgDn",
  "end": "end",
  "home": "home",
  "insert": "insert",
  "delete": "delete",
  "\\0": "0",
  "\\1": "1",
  "\\2": "2",
  "\\3": "3",
  "\\4": "4",
  "\\5": "5",
  "\\6": "6",
  "\\7": "7",
  "\\8": "8",
  "\\9": "9",
  "a": "a",
  "b": "b",
  "c": "c",
  "d": "d",
  "e": "e",
  "f": "f",
  "g": "g",
  "h": "h",
  "i": "i",
  "j": "j",
  "k": "k",
  "l": "l",
  "m": "m",
  "n": "n",
  "o": "o",
  "p": "p",
  "q": "q",
  "r": "r",
  "s": "s",
  "t": "t",
  "u": "u",
  "v": "v",
  "w": "w",
  "x": "x",
  "y": "y",
  "z": "z",
  "f1": "f1",
  "f2": "f2",
  "f3": "f3",
  "f4": "f4",
  "f5": "f5",
  "f6": "f6",
  "f7": "f7",
  "f8": "f8",
  "f9": "f9",
  "f10": "f10",
  "f11": "f11",
  "f12": "f12",
  "comma": ",",
  "minus": "-",
  "period": ".",
  "semicolon": ";",
  "equals": "=",
  "slash": "/",
  "backSlash": "\\",
  "curlyBracketOpen": "{",
  "curlyBracketClosed": "}",
  "bracketOpen": "(",
  "bracketClosed": ")",
  "squareBracketOpen": "[",
  "squareBracketClosed": "]",
  "ctrl": "lCtrl",
  "alt": "alt",
  "shift": "lShift",
  "win": "lWin",
  "scrollLock": "scrLk",
  "printScreen": "prtSc",
} as const;

export async function textParser(text: string) {
  const textParserRegex = new RegExp(
    "{" +
      [
        ...Object.keys(buttonRemap),
        `\\${__app.config.commands.prefix}.*?`,
        `\\/.*?`,
      ].join("}|{") +
      "}",
    "gi",
  );
  const fillers = text.match(textParserRegex);
  const strings = text.split(textParserRegex);

  __app.console.debugLog("[full text]", text, strings, fillers);

  for (let i = 0; i < strings.length; i++) {
    if (strings[i]) {
      __app.console.debugLog("[text]", strings[i]);
      await printTextSegments(strings[i], false, true);
    }

    if (fillers && fillers[i]) {
      const keyOrCommand = fillers[i].slice(1, -1);

      if (keyOrCommand.startsWith(__app.config.commands.prefix)) {
        __app.console.debugLog("[command]", keyOrCommand);
        await textParser(await cmd.useCommand(keyOrCommand, "return"));
      } else {
        if (!(keyOrCommand in buttonRemap)) {
          continue;
        }

        __app.console.debugLog("[key]", keyOrCommand);
        await sendKey(keyOrCommand);
      }
    }
  }
}
