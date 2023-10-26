import { debugLogLine } from '$libs/functions/debugLog';
import { logLine } from '$libs/functions/log';
import { config } from '$stores/config';
import { get } from 'svelte/store';

const SEEGAME_CHAT_PREFIX_MAP = {
	'/r': ['rádió chat', 'voki toki', 'rádió'],
	'/b': ['ócsai chat', 'oké chat', 'külső chat', 'bécset', 'pécsett'],
	'/s': ['kiabáló chat', 'ordító chat', 'kiáltás chat', 'felszólító chat'],
	'/me': ['tevékenység', 'cselekedet', 'tett', 'cselekvés', 'me'],
	'/do': ['történés', 'eset', 'esemény', 'do'],
	'/szint': ['szint'],
	'/handsup': ['kezek fel'],
	'/fall': ['fekvés'],
	'/fallfront': ['hasra', 'hasalás'],
} as const;

export default function replaceGameChatPrefixMap(text: string) {
	try {
		if (!get(config).replacers.gameChatPrefixes) {
			return text;
		}
		if (text == '') {
			return text;
		}

		for (let [replacer, searchedTexts] of Object.entries(SEEGAME_CHAT_PREFIX_MAP)) {
			for (let _text of searchedTexts) {
				if (text.startsWith(_text + ' ')) {
					let prefix = get(config).others.mtaConsoleInputMode ? replacer.slice(1) : replacer;
					debugLogLine('replacer', replacer);
					debugLogLine('_text', _text);
					debugLogLine('prefix', prefix);

					return prefix + text.slice(_text.length);
				}
			}
		}

		if (get(config).others.mtaConsoleInputMode && !text.startsWith(get(config).commands.prefix)) {
			if (text.startsWith('/')) {
				return text.slice(1);
			}

			return 'say ' + text;
		}

		return text;
	} catch (error) {
		logLine(error);
	}
}
