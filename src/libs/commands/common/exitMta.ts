import type { SpeechSynthesisConfig } from '$types/SpeechSynthesisConfig';
import { cmd } from '$libs/functions/commandHandler';
import { getActiveWindowName } from '$libs/functions/getActiveWindowName';
import { logLine } from '$libs/functions/log';
import { printText } from '$libs/functions/pressKeys';
import { dict } from '$stores/dict';
import { get } from 'svelte/store';

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig) => {
		try {
			if (['gta_sa.exe', 'proxy_sa.exe'].includes(await getActiveWindowName())) {
				logLine(get(dict).textFeedback.commands.exitMta.notInForeground);
				speechSynthesis(get(dict).speechFeedback.commands.exitMta.notInForeground);
				return;
			}

			await printText('exit', true);
		} catch (error) {
			logLine(error);
		}
	},
	['both', 'MTA:SA Bezárás', null, ['mtabezárás', 'mtakilépés', 'closemta', 'exitmta'], get(dict).textFeedback.commands.exitMta.description],
);
