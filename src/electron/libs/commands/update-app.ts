import { app } from 'electron';
import { autoUpdater } from 'electron-updater';

import { __app } from '../app.js';
import { cmd } from '../command-handler.js';

cmd.registerCommand(
	async function (speechSynthesis) {
		__app.console.log(__app.dictionary.textFeedback.commands.updateApp.checkingUpdate);

		if (await autoUpdater.checkForUpdatesAndNotify()) {
			__app.console.log(__app.dictionary.textFeedback.commands.updateApp.updateAvailabe);
			await speechSynthesis.speak(__app.dictionary.speechFeedback.commands.updateApp.updateAvailabe);

			app.relaunch();
			app.exit();
			return;
		}

		__app.console.log(__app.dictionary.textFeedback.commands.updateApp.noUpdateAvailabe);
	},
	['both', 'Alkalmazás frissítés', null, ['frissítés', '!', 'up', 'update'], __app.dictionary.textFeedback.commands.updateApp.description],
);
