import { Hardware as Keysender } from "@energypatrikhu/keysender";
import { Hardware as NodeHardware } from "@energypatrikhu/node-hardware";
import { dialog } from "electron";
import _ from "lodash";
import { basename } from "path";

import { __app } from "./app.js";
import { cmd } from "./command-handler.js";
import { saveConfig } from "./config.js";
import { saveMacros } from "./macros.js";
import { main } from "./main.js";
import { loadTranslation } from "./translations.js";

export class EventRouter {
  private ipcMain;
  private mainWindow;
  private isDev;
  private isBeta;
  private isReady: boolean = false;

  constructor(
    ipcMain: Electron.IpcMain,
    mainWindow: Electron.BrowserWindow,
    isDev: boolean,
    isBeta: boolean,
  ) {
    this.ipcMain = ipcMain;
    this.mainWindow = mainWindow;
    this.isDev = isDev;
    this.isBeta = isBeta;

    this.router();
  }

  router() {
    this.ipcMain.on("electron", async (_event, { event, data }) => {
      switch (event) {
        case "ready": {
          await main(this.ipcMain, this.mainWindow, this.isDev, this.isBeta);
          this.isReady = true;
          break;
        }

        case "config": {
          if (this.isReady && !_.isEqual(__app.config, data)) {
            __app.console.debugLog("Config Changed Event");

            const { oldApp } = __app.set({ config: data });
            __app.console.debugLog("Config Changed!");

            __app.console.debugLog(
              oldApp.config.feedback.language,
              __app.config.feedback.language,
            );

            // feedback ( language and sounds )
            if (
              !_.isEqual(
                oldApp.config.feedback.language,
                __app.config.feedback.language,
              )
            ) {
              __app.console.debugLog("feedback.language changed!");

              const translations = loadTranslation();
              __app.set({ translations });

              if (!this.isDev) {
                __app.speechSynthesis.updateEngine();
              }

              this.mainWindow.webContents.send("electron", {
                event: "translations",
                data: { translations },
              });
            }

            // speech recognition
            if (
              !_.isEqual(
                oldApp.config.speechRecognition,
                __app.config.speechRecognition,
              )
            ) {
              __app.console.debugLog("speechRecognition changed!");
              if (!this.isDev) {
                __app.speechRecognition.updateEngine();
              }
            }

            // interception
            if (
              oldApp.config.others.useInterception !==
              __app.config.others.useInterception
            ) {
              __app.console.debugLog("Input method changed!");
              __app.hardware.keyboard =
                __app.config.others.useInterception &&
                __app.interceptionDriverInstalled
                  ? new NodeHardware().keyboard
                  : new Keysender().keyboard;
            }

            saveConfig(data);
          }

          break;
        }

        case "macros": {
          if (this.isReady && !_.isEqual(__app.macros, data)) {
            __app.console.debugLog("Macros Changed!");

            __app.set({ macros: data });

            saveMacros(data);
          }

          break;
        }

        case "selectAudioFile": {
          const fileData = dialog.showOpenDialogSync(this.mainWindow, {
            title: "Select sound file",
            properties: ["openFile", "showHiddenFiles", "dontAddToRecent"],
            filters: [
              {
                name: "Audio",
                extensions: [
                  "mp3",
                  "m4a",
                  "ogg",
                  "opus",
                  "flac",
                  "aac",
                  "wav",
                  "wma",
                ],
              },
            ],
          });

          this.mainWindow.webContents.send("electron", {
            event: "selectAudioFile",
            data:
              fileData && fileData.length > 0
                ? {
                    filepath: fileData[0],
                    basepath: fileData[0].slice(0, -basename(fileData[0]))
                      .length,
                    basename: basename(fileData[0]),
                  }
                : null,
          });
          break;
        }

        case "playTest": {
          this.mainWindow.webContents.send("electron", {
            event: "playAudio",
            data: {
              src: __app.config.feedback.sounds.file.filepath,
              volume: __app.config.feedback.sounds.volume,
            },
          });
          break;
        }

        case "textInput": {
          cmd.textCommandHandler(__app.config.commands.prefix + data);
          break;
        }
      }
    });
  }
}
