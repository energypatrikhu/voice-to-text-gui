import { convertTextArray } from '$libs/functions/convertTextArray';
import { getLocaleTime } from '$libs/functions/getLocaleTime';
import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { Console } from '$types/Console';

export const eConsole = <Writable<Array<Console>>>writable([]);

export function updateConsoleStore(partialConsoleData: Partial<Console>) {
	const consoleData = {
		severity: partialConsoleData.severity!,
		type: partialConsoleData.type!,
		timestamp: Date.now(),
		dateTime: getLocaleTime(),
		textArray: convertTextArray(partialConsoleData.textArray!),
	};

	eConsole.update(function (_eConsole) {
		_eConsole.push(consoleData);
		return _eConsole;
	});

	return consoleData;
}

// Normal
export function cLog(...textArray: Array<any>) {
	return updateConsoleStore({ severity: 'Info', type: 'Normal', textArray });
}
export function cWarning(...textArray: Array<any>) {
	return updateConsoleStore({ severity: 'Warning', type: 'Normal', textArray });
}
export function cError(...textArray: Array<any>) {
	return updateConsoleStore({ severity: 'Error', type: 'Normal', textArray });
}

// Debug
export function cDebugLog(...textArray: Array<any>) {
	return updateConsoleStore({ severity: 'Info', type: 'Debug', textArray });
}
export function cDebugWarning(...textArray: Array<any>) {
	return updateConsoleStore({ severity: 'Warning', type: 'Debug', textArray });
}
export function cDebugError(...textArray: Array<any>) {
	return updateConsoleStore({ severity: 'Error', type: 'Debug', textArray });
}
