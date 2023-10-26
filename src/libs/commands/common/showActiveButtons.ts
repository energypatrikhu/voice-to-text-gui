import { cmd } from '$libs/functions/commandHandler';
import { logLine } from '$libs/functions/log';
import { config } from '$stores/config';
import { dict } from '$stores/dict';
import { get } from 'svelte/store';

import type { SpeechSynthesisConfig } from '$types/SpeechSynthesisConfig';

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig) => {
		config.update(function (_config) {
			_config.others.showActiveButtons = !_config.others.showActiveButtons;
			return _config;
		});

		if (get(config).others.showActiveButtons) {
			logLine(get(dict).textFeedback.commands.showActiveButtons.showActiveButtons.enabled);
			speechSynthesis(get(dict).speechFeedback.commands.showActiveButtons.showActiveButtons.enabled);
		} else {
			logLine(get(dict).textFeedback.commands.showActiveButtons.showActiveButtons.disabled);
			speechSynthesis(get(dict).speechFeedback.commands.showActiveButtons.showActiveButtons.disabled);
		}
	},
	['both', 'Aktív Gombok', null, ['aktívgombok', 'activebuttons'], get(dict).textFeedback.commands.showActiveButtons.description],
);
