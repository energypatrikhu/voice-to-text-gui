import { rmSync } from 'fs';

for (const path in process.argv.slice(1)) {
	rmSync(path, { recursive: true, force: true });
}
