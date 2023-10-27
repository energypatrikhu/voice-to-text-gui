import { __app } from '../app.js';
import { cmd } from '../command-handler.js';
import { getActiveWindowName } from '../get-active-window-name.js';
import { textReplacer } from '../text-replacer.js';

cmd.registerCommand(
	async (speechSynthesis) => {
		let activeWindow = await getActiveWindowName();

		__app.console.log(textReplacer(__app.dictionary.textFeedback.commands.activeWindow.activeWindow, activeWindow));
		speechSynthesis.speak(textReplacer(__app.dictionary.speechFeedback.commands.activeWindow.activeWindow, activeWindow));
	},
	['both', 'Aktív Ablak', null, 'aktívablak', __app.dictionary.textFeedback.commands.activeWindow.description],
);
