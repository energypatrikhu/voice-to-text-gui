import type { SpeechSynthesisConfig } from '$types/SpeechSynthesisConfig';
import { cmd } from '$libs/functions/commandHandler';
import { textReplacer } from '$libs/functions/dict';
import { getActiveWindowName } from '$libs/functions/getActiveWindowName';
import { logLine } from '$libs/functions/log';
import { dict } from '$stores/dict';
import { get } from 'svelte/store';

cmd.registerCommand(
	async (speechSynthesis: SpeechSynthesisConfig) => {
		let activeWindow = await getActiveWindowName();

		logLine(textReplacer(get(dict).textFeedback.commands.activeWindow.activeWindow, activeWindow));
		speechSynthesis(textReplacer(get(dict).speechFeedback.commands.activeWindow.activeWindow, activeWindow));
	},
	['both', 'Aktív Ablak', null, 'aktívablak', get(dict).textFeedback.commands.activeWindow.description],
);
