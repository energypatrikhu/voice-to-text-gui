import _ from "lodash";

import { __app } from "./app.js";
import { loadJson, saveJson } from "./json-storage.js";

import type { ConfigOptions } from "../../types/ConfigOptions.js";

const defaultConfig: ConfigOptions = {
  logs: {
    debug: true,
    saveToFile: true,
  },
  input: {
    holdToActivate: true,
    keyboardShortcuts: [
      {
        outputPrefix: null,
        shortcut: ["win", "h"],
      },
    ],
    autoRelease: {
      enabled: false,
      releaseTime: 60,
    },
  },
  output: {
    partial: false,
    animated: false,
    typingDelay: 50,
  },
  feedback: {
    sounds: {
      enabled: true,
      volume: 0.1,
      mode: "default",
      file: {
        filepath: null,
        basepath: null,
        basename: null,
      },
    },
    speech: {
      enabled: true,
      volume: 0.5,
    },
    language: "en",
  },
  speechRecognition: {
    language: "hu-HU",
    customWordsAndPhrases: [],
  },
  replacers: {
    punctuationMarks: true,
    gameChatPrefixes: false,
  },
  windowAllowList: {
    enabled: false,
    windows: [],
  },
  macros: {
    enabled: true,
  },
  commands: {
    enabled: true,
    prefix: "!",
    splitter: ":",
  },
  update: {
    checkOnStartup: true,
    allowPrerelease: false,
    allowDowngrade: false,
    autoCheck: true,
    checkInterval: 60,
    checkChromeUpdates: true,
  },
  others: {
    mtaConsoleInputMode: false,
    showActiveButtons: false,
  },
};

function patchConfig(
  newConfig: { [x: string]: any },
  oldConfig: { [x: string]: any },
  defaultConfig: object,
) {
  try {
    for (const [key, value] of Object.entries(defaultConfig)) {
      if (
        value !== null &&
        typeof value !== "boolean" &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        Object.assign(newConfig, {
          [key]: patchConfig({}, oldConfig[key] ?? {}, value),
        });
      } else if (!(key in oldConfig) && typeof oldConfig === "object") {
        newConfig[key] = value;
      } else {
        newConfig[key] = oldConfig[key];
      }
    }

    return newConfig;
  } catch {
    return defaultConfig;
  }
}

export function loadConfig() {
  const savedConfig = loadJson<ConfigOptions>("config");
  const loadedConfig = savedConfig ?? defaultConfig;
  const patchedConfig = patchConfig(
    {},
    loadedConfig,
    defaultConfig,
  ) as ConfigOptions;

  if (!_.isEqual(loadedConfig, patchedConfig) || !savedConfig) {
    saveJson("config", patchedConfig);
  }

  return patchedConfig;
}

export function saveConfig(config: ConfigOptions) {
  saveJson("config", config);
  __app.settingsUpdate.send("config");
}
