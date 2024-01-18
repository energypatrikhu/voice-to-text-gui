import { __app } from '../app.js';
import { cmd } from '../command-handler.js';
import { saveConfig } from '../config.js';

cmd.registerCommand(
	async function (speechSynthesis) {
		try {
			__app.config.others.mtaConsoleInputMode = !__app.config.others.mtaConsoleInputMode;
			saveConfig(__app.config);

			if (__app.config.others.mtaConsoleInputMode) {
				__app.console.log(__app.translation.textFeedback.commands.mtaMode.mtaConsoleInputMode.enabled);
				speechSynthesis.speak(__app.translation.speechFeedback.commands.mtaMode.mtaConsoleInputMode.enabled);
			} else {
				__app.console.log(__app.translation.textFeedback.commands.mtaMode.mtaConsoleInputMode.disabled);
				speechSynthesis.speak(__app.translation.speechFeedback.commands.mtaMode.mtaConsoleInputMode.disabled);
			}
		} catch (error) {
			__app.console.debugErrorLog(error);
		}
	},
	['both', 'MTA:SA Mód', null, 'mtamód', __app.translation.textFeedback.commands.mtaMode.description],
);
