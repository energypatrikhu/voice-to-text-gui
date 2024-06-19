import type { KeyboardShortcut } from '$types/KeyboardShortcut';

export interface ConfigOptions {
  logs: {
    debug: boolean;
    saveToFile: boolean;
  };
  input: {
    holdToActivate: boolean;
    keyboardShortcuts: Array<KeyboardShortcut>;
    autoRelease: {
      enabled: boolean;
      releaseTime: number;
    };
  };
  output: {
    partial: boolean;
    animated: boolean;
    typingDelay: number;
  };
  feedback: {
    sounds: {
      enabled: boolean;
      volume: number;
      mode: 'default' | 'custom';
      file: {
        filepath: string | null;
        basepath: string | null;
        basename: string | null;
      };
    };
    speech: {
      enabled: boolean;
      volume: number;
    };
    language: 'hu' | 'en';
  };
  speechRecognition: {
    language: 'hu-HU' | 'en-US' | 'en-GB';
    customWordsAndPhrases: Array<string>;
  };
  replacers: {
    punctuationMarks: boolean;
    gameChatPrefixes: boolean;
  };
  windowAllowList: {
    enabled: boolean;
    windows: Array<string>;
  };
  commands: {
    enabled: boolean;
    prefix: string;
    splitter: string;
  };
  update: {
    checkOnStartup: boolean;
    allowPrerelease: boolean;
    allowDowngrade: boolean;
    autoCheck: boolean;
    checkInterval: number;
    checkChromeUpdates: boolean;
  };
  others: {
    mtaConsoleInputMode: boolean;
    showActiveButtons: boolean;
  };
}
