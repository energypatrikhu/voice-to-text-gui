import { config } from '$stores/config';
import { get } from 'svelte/store';

export function keyboardShortcutMapper(pressedKeys: { [key: string]: boolean }) {
	// return !shortcutConfig.map((button) => pressedKeys[button] ?? false).includes(false);
	for (let { outputPrefix, shortcut } of get(config).input.keyboardShortcuts) {
		if (!shortcut.map((button) => pressedKeys[button] ?? false).includes(false)) {
			return { match: true, outputPrefix };
		}
	}

	return { match: false, outputPrefix: null };
}
