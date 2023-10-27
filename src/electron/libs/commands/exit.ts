import { __app } from '../app.js';
import { cmd } from '../command-handler.js';

cmd.registerCommand(
	async (speechSynthesis) => {
		try {
			await speechSynthesis.speak(__app.dictionary.speechFeedback.commands.exit.closingApp);

			process.exit();
		} catch (error) {
			__app.console.debugErrorLog(error);
		}
	},
	['both', 'Alkalmazás bezárás', null, ['kilépés', 'bezárás', 'close', 'exit'], __app.dictionary.textFeedback.commands.exit.description],
);