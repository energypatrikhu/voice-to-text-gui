import { app } from 'electron';
import { autoUpdater } from 'electron-updater';

import { __app } from './app.js';
import { convertFileSize } from './convert-file-size.js';
import { saveManifest } from './manifest.js';
import { sleep } from './sleep.js';
import { textReplacer } from './text-replacer.js';

export class Updater {
  constructor() {
    autoUpdater.allowPrerelease = __app.config.update.allowPrerelease;
    autoUpdater.allowDowngrade = __app.config.update.allowDowngrade;

    autoUpdater.on('download-progress', function (progObj) {
      __app.console.log(
        textReplacer(
          __app.translations.textFeedback.index.updater.updateDownloading,
          convertFileSize({ bytes: progObj.bytesPerSecond }),
          progObj.percent.toFixed(2),
          convertFileSize({ bytes: progObj.transferred }),
          convertFileSize({ bytes: progObj.total }),
        ),
      );
    });

    autoUpdater.on('update-downloaded', async function () {
      if (!__app.updateReason) {
        return;
      }

      switch (__app.updateReason) {
        case 'manual': {
          __app.console.log(__app.translations.textFeedback.update.checkAppUpdate.updateDownloaded);
          if (__app.speechSynthesis) {
            await __app.speechSynthesis.speak(__app.translations.textFeedback.update.checkAppUpdate.updateDownloaded);
          }

          await saveManifest({ isFirstStart: true });

          if (!__app.speechSynthesis) {
            await sleep(3000);
          }

          autoUpdater.quitAndInstall(true, true);
          app.exit();
          break;
        }
        case 'automatic': {
          __app.set({ downloadedUpdate: true });
          break;
        }
      }
    });
  }

  async init() {
    setTimeout(
      this.autoRunChecker,
      (__app.config.update.checkInterval < 1 ? 1 : __app.config.update.checkInterval) * 60 * 1000,
    );

    if (__app.config.update.checkOnStartup) {
      __app.console.log(__app.translations.textFeedback.update.checkAppUpdate.checkingUpdate);
      return await this.checker('manual');
    }
  }

  async checker(mode: 'automatic' | 'manual') {
    __app.set({ updateReason: mode });

    switch (mode) {
      case 'manual': {
        if (__app.versions.appVersion !== (await autoUpdater.checkForUpdates())?.updateInfo.version) {
          __app.console.log(__app.translations.textFeedback.update.checkAppUpdate.notUpToDate);
          return true;
        }
        break;
      }
      case 'automatic': {
        if (__app.versions.appVersion !== (await autoUpdater.checkForUpdatesAndNotify())?.updateInfo.version) {
          return true;
        }
        break;
      }
    }

    return false;
  }

  async autoRunChecker() {
    if (__app.config.update.autoCheck) {
      __app.console.debugLog(__app.translations.textFeedback.update.checkAppUpdate.checkingUpdate);
      if (!(await this.checker('automatic'))) {
        __app.console.debugLog(__app.translations.textFeedback.update.checkAppUpdate.upToDate);
      }
    }

    setTimeout(
      this.autoRunChecker,
      (__app.config.update.checkInterval < 1 ? 1 : __app.config.update.checkInterval) * 60 * 1000,
    );
  }
}
