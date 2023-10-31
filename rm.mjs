import { readdirSync, rmSync, statSync } from 'fs';
import { join, resolve } from 'path';

for (const rawPath in process.argv.slice(1)) {
	const path = resolve(rawPath);
	const stat = statSync(path);

	if (stat.isFile()) {
		try {
			rmSync(path, { recursive: true, force: true });
			console.log('Removed:', path);
		} catch {
			console.log('Failed to remove:', path);
		}
	} else if (stat.isDirectory()) {
		(function __remover(absPath) {
			for (const dirent of readdirSync(absPath, { withFileTypes: true })) {
				const direntDir = join(absPath, dirent.name);

				if (dirent.isFile()) {
					try {
						rmSync(direntDir, { recursive: true, force: true });
						console.log('Removed:', direntDir);
					} catch {
						console.log('Failed to remove:', direntDir);
					}
				} else if (dirent.isDirectory()) {
					__remover(direntDir);
				}
			}
		})(path);
	}
}
