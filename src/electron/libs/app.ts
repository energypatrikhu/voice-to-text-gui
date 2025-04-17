import _ from "lodash";
import type { Page } from "puppeteer-core";
import type { ConfigOptions } from "../../types/ConfigOptions.js";
import type { Versions } from "../../types/electron/Versions.js";
import type { Macro } from "../../types/Macro.js";
import type { Translations } from "../../types/Translations.js";
import type { Console } from "./console.js";
import type { SettingsUpdate } from "./send-settings-update.js";
import type { SpeechRecognitionEngine } from "./speech-recognition-engine.js";
import type { SpeechSynthesisEngine } from "./speech-synthesis-engine.js";

import type { Manifest } from "../../types/electron/Manifest.js";

export class App {
  isDev!: boolean;
  isBeta!: boolean;

  ipcMain!: Electron.IpcMain;
  mainWindow!: Electron.BrowserWindow;

  config!: ConfigOptions;
  macros!: Array<Macro>;
  versions!: Versions;
  translations!: Translations;
  chromePage!: Page;
  manifest!: Manifest;

  speechRecognition!: SpeechRecognitionEngine;
  speechSynthesis!: SpeechSynthesisEngine;
  console!: Console;
  settingsUpdate!: SettingsUpdate;

  checkingForUpdate!: boolean;
  updateReason!: "manual" | "automatic" | null;
  downloadedUpdate!: boolean;

  userDataFolder!: string;
  resources!: string;

  set(data: Partial<App>) {
    const oldApp = _.omit(this, ["set"]);
    Object.assign(this, data);
    return { newApp: data as App, oldApp };
  }
}

export const __app = new App();
