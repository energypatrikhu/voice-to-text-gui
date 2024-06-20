import { __app } from './app.js';

export function keyboardShortcutMapper(pressedKeys: { [key: string]: boolean }) {
  for (const { outputPrefix, shortcut } of __app.config.input.keyboardShortcuts) {
    if (!shortcut.map((button) => pressedKeys[button] ?? false).includes(false)) {
      return { match: true, outputPrefix };
    }
  }

  return { match: false, outputPrefix: null };
}
