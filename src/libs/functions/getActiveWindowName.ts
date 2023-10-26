import { debugLogLine } from '$libs/functions/debugLog';
import activeWindow from 'active-win';
import { basename } from 'path';

export async function getActiveWindowName() {
	const result = await activeWindow();

	if (!result) {
		return '';
	}

	debugLogLine({ result });

	return basename(result.owner.path);
}
