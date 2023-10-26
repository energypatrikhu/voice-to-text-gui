import { cmd } from '$libs/functions/commandHandler';
import { logLine } from '$libs/functions/log';
import { config } from '$stores/config';
import { dict } from '$stores/dict';
import { get } from 'svelte/store';

import type { SpeechSynthesisConfig } from '$types/SpeechSynthesisConfig';

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig) => {
		try {
			config.update(function (_config) {
				_config.others.mtaConsoleInputMode = !_config.others.mtaConsoleInputMode;
				return _config;
			});

			if (get(config).others.mtaConsoleInputMode) {
				logLine(get(dict).textFeedback.commands.mtaMode.mtaConsoleInputMode.enabled);
				speechSynthesis(get(dict).speechFeedback.commands.mtaMode.mtaConsoleInputMode.enabled);
			} else {
				logLine(get(dict).textFeedback.commands.mtaMode.mtaConsoleInputMode.disabled);
				speechSynthesis(get(dict).speechFeedback.commands.mtaMode.mtaConsoleInputMode.disabled);
			}
		} catch (error) {
			logLine(error);
		}
	},
	['both', 'MTA:SA Mód', null, 'mtamód', get(dict).textFeedback.commands.mtaMode.description],
);
