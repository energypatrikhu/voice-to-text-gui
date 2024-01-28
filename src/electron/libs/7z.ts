import { spawn } from 'child_process';
import { join, resolve } from 'path';

import { __app } from './app.js';

export function extractArchive(filename: string, outputPath: string = '') {
	const _7z = resolve(join(__app.resources, 'helpers', '7z.exe'));
	const _7zProcess = spawn(_7z, ['x', `-o${join(__app.resources, outputPath)}`, filename]);

	return new Promise<void>((promiseResolve) => {
		_7zProcess.on('exit', promiseResolve);
	});
}
