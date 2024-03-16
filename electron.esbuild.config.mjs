import { build } from 'esbuild';
import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const __source = './src/electron';
const __destination = './resources/app';
const isDev = process.env.NODE_ENV === 'dev';
const isBeta = process.env.APP_SATE === 'beta';

async function removeOldEntries(absoluteDir) {
	for (const dirent of await readdir(absoluteDir, { withFileTypes: true })) {
		const direntDir = join(absoluteDir, dirent.name);

		if (dirent.isFile()) {
			await rm(direntDir, { force: true });
		} else if (dirent.isDirectory()) {
			await removeOldEntries(direntDir);
		}
	}
}

async function searchEntries(absoluteDir) {
	let entries = [];
	for (const dirent of await readdir(absoluteDir, { withFileTypes: true })) {
		const direntDir = join(absoluteDir, dirent.name);

		if (dirent.isFile()) {
			entries.push(direntDir);
		} else if (dirent.isDirectory()) {
			entries.push(...(await searchEntries(direntDir)));
		}
	}
	return entries;
}

async function editFiles(absoluteDir) {
	for (const dirent of await readdir(absoluteDir, { withFileTypes: true })) {
		const direntDir = join(absoluteDir, dirent.name);

		if (dirent.isFile()) {
			const fileContent = await readFile(direntDir, 'utf-8');
			await writeFile(direntDir, fileContent.replace(/\.js\"/gi, '.cjs"'));
		} else if (dirent.isDirectory()) {
			await editFiles(direntDir);
		}
	}
}

(async function () {
	await removeOldEntries(__destination);
	const entries = await searchEntries(__source);
	await build({
		entryPoints: entries,
		platform: 'node',
		outdir: __destination,
		logLevel: 'debug',
		minify: !isDev && !isBeta,
		drop: !isDev && !isBeta ? ['console', 'debugger'] : [],
		treeShaking: !isDev && !isBeta,
		mangleQuoted: !isDev && !isBeta,
		format: 'cjs',
		outExtension: { '.js': '.cjs' },
	});
	await editFiles(__destination);
})();
