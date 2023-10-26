const { readFileSync, writeFileSync } = require('fs');

const packageJsonFile = JSON.parse(readFileSync('./package.json', 'utf-8'));

writeFileSync('./v', packageJsonFile.version, 'utf-8');
