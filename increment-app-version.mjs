import { readFile, writeFile } from 'fs/promises';

const packageJson = JSON.parse(await readFile('./package.json', { encoding: 'utf-8' }));

const currentVersion = parseInt(packageJson.version.replace(/\./g, ''));

packageJson.version = (currentVersion + 1).toString().split('').join('.');

await writeFile('./package.json', JSON.stringify(packageJson), { encoding: 'utf-8' });
