import type { SpeechSynthesisConfig } from '$types/SpeechSynthesisConfig';
import { cmd } from '$libs/functions/commandHandler';
import { logLine } from '$libs/functions/log';
import { dict } from '$stores/dict';
import { get } from 'svelte/store';

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig) => {
		try {
			await speechSynthesis(get(dict).speechFeedback.commands.exit.closingApp);

			process.exit();
		} catch (error) {
			logLine(error);
		}
	},
	['both', 'Alkalmazás bezárás', null, ['kilépés', 'bezárás', 'close', 'exit'], get(dict).textFeedback.commands.exit.description],
);
