import { autoUpdater } from 'electron-updater';

import { __app } from '../app.js';
import { cmd } from '../command-handler.js';

cmd.registerCommand(
  async function (speechSynthesis) {
    __app.checkingForUpdate = true;
    __app.console.log(__app.translations.textFeedback.commands.updateApp.checkingUpdate);

    if (__app.versions.appVersion !== (await autoUpdater.checkForUpdatesAndNotify())?.updateInfo.version) {
      __app.updateReason = 'manual';

      __app.console.log(__app.translations.textFeedback.commands.updateApp.updateAvailable);
      speechSynthesis.speak(__app.translations.speechFeedback.commands.updateApp.updateAvailable);

      return;
    }

    __app.console.log(__app.translations.textFeedback.commands.updateApp.noUpdateAvailable);
  },
  [
    'both',
    'Alkalmazás frissítés',
    null,
    ['frissítés', '!', 'up', 'update'],
    __app.translations.textFeedback.commands.updateApp.description,
  ],
);
