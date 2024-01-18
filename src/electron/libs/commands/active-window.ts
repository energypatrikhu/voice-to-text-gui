import { __app } from '../app.js';
import { cmd } from '../command-handler.js';
import { getActiveWindowName } from '../get-active-window-name.js';
import { textReplacer } from '../text-replacer.js';

cmd.registerCommand(
	async function (speechSynthesis) {
		let activeWindow = await getActiveWindowName();

		__app.console.log(textReplacer(__app.translation.textFeedback.commands.activeWindow.activeWindow, activeWindow));
		speechSynthesis.speak(textReplacer(__app.translation.speechFeedback.commands.activeWindow.activeWindow, activeWindow));
	},
	['both', 'Aktív Ablak', null, 'aktívablak', __app.translation.textFeedback.commands.activeWindow.description],
);
