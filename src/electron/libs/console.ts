import { app } from 'electron';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { EOL } from 'os';
import { join } from 'path';

import { __app } from './app.js';
import { convertTextArray } from './convert-text-array.js';
import { getLocaleTime } from './get-locale-time.js';

import type { Console as AppConsole } from '../../types/Console.js';

export class Console {
  private logsPath = join(app.getPath('documents'), 'Voice To Text Logs');

  init() {
    if (!__app.config.logs.saveToFile || __app.isDev) return this;

    if (!existsSync(this.logsPath)) {
      mkdirSync(this.logsPath, {
        recursive: true,
      });
    }

    __app.ipcMain.on('electron', (_, { event, data }) => {
      switch (event) {
        case 'log': {
          appendFileSync(
            join(this.logsPath, data.filename),
            [
              '[' + data.type + ']',
              '[' + new Date(data.timestamp).toLocaleString() + ']',
              '[' + data.severity + ']',
              '\n',
              ...data.textArray,
              EOL,
            ].join(' '),
          );
          break;
        }
      }
    });

    return this;
  }

  private sendLog(data: Partial<AppConsole>) {
    __app.mainWindow.webContents.send('electron', {
      event: 'log',
      data: {
        lang: 'txt',
        ...data,
        timestamp: Date.now(),
        dateTime: getLocaleTime(),
        textArray: convertTextArray(data.textArray!),
      },
    });

    return this;
  }

  logJson(...messages: Array<any>) {
    this.sendLog({ type: 'Normal', severity: 'Info', lang: 'json', textArray: messages });
  }
  debugLogJson(...messages: Array<any>) {
    if (!__app.config.logs.debug) return;
    this.sendLog({ type: 'Debug', severity: 'Info', lang: 'json', textArray: messages });
  }

  log(...messages: Array<any>) {
    this.sendLog({ type: 'Normal', severity: 'Info', textArray: messages });
  }
  debugLog(...messages: Array<any>) {
    if (!__app.config.logs.debug) return;
    this.sendLog({ type: 'Debug', severity: 'Info', textArray: messages });
  }

  warningLog(...messages: Array<any>) {
    this.sendLog({ type: 'Normal', severity: 'Warning', textArray: messages });
  }
  debugWarningLog(...messages: Array<any>) {
    if (!__app.config.logs.debug) return;
    this.sendLog({ type: 'Debug', severity: 'Warning', textArray: messages });
  }

  errorLog(...messages: Array<any>) {
    this.sendLog({ type: 'Normal', severity: 'Error', textArray: messages });
  }
  debugErrorLog(...messages: Array<any>) {
    if (!__app.config.logs.debug) return;
    this.sendLog({ type: 'Debug', severity: 'Error', textArray: messages });
  }
}
