import { readFile, writeFile } from 'fs/promises';

const packageJson = JSON.parse(await readFile('./package.json', { encoding: 'utf-8' }));

const versionNumbers = packageJson.version.split('.').map(function (stringNumber) {
	return parseInt(stringNumber);
});

versionNumbers[2] += 1;
for (let i = versionNumbers.length - 1; i > 0; i--) {
	console.log({ i }, versionNumbers[i]);

	if (versionNumbers[i] > 9) {
		versionNumbers[i] = 0;
		versionNumbers[i - 1] += 1;
	}
}

packageJson.version = versionNumbers.join('.');

await writeFile('./package.json', JSON.stringify(packageJson, null, '\t'), { encoding: 'utf-8' });
