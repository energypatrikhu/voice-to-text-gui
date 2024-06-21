import { EventType, uIOhook, type UiohookKeyboardEvent, type UiohookMouseEvent, type UiohookWheelEvent } from 'uiohook-napi';

const uiohookKeys = {
  14: 'backspace',
  15: 'tab',
  28: 'enter',
  3612: 'enter',
  58: 'capsLock',
  1: 'escape',
  57: 'space',
  3657: 'pageUp',
  3665: 'pageDown',
  3663: 'end',
  3655: 'home',
  57419: 'arrowLeft',
  57416: 'arrowUp',
  57421: 'arrowRight',
  57424: 'arrowDown',
  3666: 'insert',
  3667: 'delete',
  11: '0',
  2: '1',
  3: '2',
  4: '3',
  5: '4',
  6: '5',
  7: '6',
  8: '7',
  9: '8',
  10: '9',
  30: 'a',
  48: 'b',
  46: 'c',
  32: 'd',
  18: 'e',
  33: 'f',
  34: 'g',
  35: 'h',
  23: 'i',
  36: 'j',
  37: 'k',
  38: 'l',
  50: 'm',
  49: 'n',
  24: 'o',
  25: 'p',
  16: 'q',
  19: 'r',
  31: 's',
  20: 't',
  22: 'u',
  47: 'v',
  17: 'w',
  45: 'x',
  21: 'y',
  44: 'z',
  39: 'é',
  13: 'ó',
  53: 'ü',
  41: 'ö',
  26: 'ő',
  43: 'ű',
  27: 'ú',
  40: 'á',
  3654: 'í',
  82: 'numpad0',
  79: 'numpad1',
  80: 'numpad2',
  81: 'numpad3',
  75: 'numpad4',
  76: 'numpad5',
  77: 'numpad6',
  71: 'numpad7',
  72: 'numpad8',
  73: 'numpad9',
  55: 'numpadMultiply',
  78: 'numpadAdd',
  74: 'numpadSubtract',
  83: 'numpadDecimal',
  3637: 'numpadDivide',
  59: 'f1',
  60: 'f2',
  61: 'f3',
  62: 'f4',
  63: 'f5',
  64: 'f6',
  65: 'f7',
  66: 'f8',
  67: 'f9',
  68: 'f10',
  87: 'f11',
  88: 'f12',
  91: 'f13',
  92: 'f14',
  93: 'f15',
  99: 'f16',
  100: 'f17',
  101: 'f18',
  102: 'f19',
  103: 'f20',
  104: 'f21',
  105: 'f22',
  106: 'f23',
  107: 'f24',
  51: 'comma',
  12: 'minus',
  52: 'period',
  29: 'ctrl',
  3613: 'ctrl',
  56: 'alt',
  3640: 'alt',
  42: 'shift',
  54: 'shift',
  3675: 'win',
  3676: 'win',
  69: 'numLock',
  70: 'scrollLock',
  3639: 'printScreen',
  3653: 'pauseBreak',
} as const;

export type KeyCode = keyof typeof uiohookKeys;
export type Key = (typeof uiohookKeys)[KeyCode];

const pressedKeys: Partial<Record<Key, boolean>> = {};
export interface ioStdout {
  key: Key;
  pressedKeys: typeof pressedKeys;
}

function uioHookInputParser(event: UiohookKeyboardEvent | UiohookMouseEvent | UiohookWheelEvent) {
  const isKey = event.type === EventType.EVENT_KEY_PRESSED || event.type === EventType.EVENT_KEY_RELEASED;
  const isMouse = event.type === EventType.EVENT_MOUSE_PRESSED || event.type === EventType.EVENT_MOUSE_RELEASED;

  if (!isKey && !isMouse) {
    return;
  }

  let isPressed: boolean = false;
  let keyName: string = '';

  if (isKey) {
    switch (event.type) {
      case EventType.EVENT_KEY_PRESSED: {
        isPressed = true;
        break;
      }
      case EventType.EVENT_KEY_RELEASED: {
        isPressed = false;
        break;
      }
    }

    const keyboardEvent = event as UiohookKeyboardEvent;

    if (keyboardEvent.keycode in uiohookKeys) {
      keyName = uiohookKeys[keyboardEvent.keycode as KeyCode];
    } else {
      keyName = `unknown[${keyboardEvent.keycode}]`;
    }
  } else if (isMouse) {
    switch (event.type) {
      case EventType.EVENT_MOUSE_PRESSED:
        isPressed = true;
        break;
      case EventType.EVENT_MOUSE_RELEASED:
        isPressed = false;
        break;
    }

    const mouseEvent = event as UiohookMouseEvent;

    keyName = `mouse${mouseEvent.button}`;
  }

  pressedKeys[keyName as Key] = isPressed;

  return { key: keyName as Key, pressedKeys };
}

class UioHookWrapper {
  subscribers = new Set<(keyEvent: ioStdout) => void>();

  constructor() {
    uIOhook.on('input', (event) => {
      const uioHookParserData = uioHookInputParser(event);
      if (uioHookParserData) {
        this.subscribers.forEach((callbackFn) => {
          callbackFn(uioHookParserData);
        });
      }
    });
    uIOhook.start();
  }

  subscribe(callbackFn: (keyEvent: ioStdout) => void) {
    this.subscribers.add(callbackFn);
  }

  unsubscribe(callbackFn: (keyEvent: ioStdout) => void) {
    this.subscribers.delete(callbackFn);
  }
}

export const uioHookWrapper = new UioHookWrapper();
