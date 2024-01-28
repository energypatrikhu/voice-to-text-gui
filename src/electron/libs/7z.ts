import { execSync } from 'child_process';
import { join, resolve } from 'path';

import { __app } from './app.js';

export function extractArchive(filename: string, outputPath: string = '') {
	const _7z = resolve(join(__app.resources, 'helpers', '7z.exe'));
	const cmd = `"${_7z}" x -o"${join(__app.resources, outputPath)}" "${filename}"`;
	__app.console.debugLog(cmd);
	return execSync(cmd);
}
