import { build } from 'esbuild';
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

const __source = './src/electron';
const __destination = './resources/app';
const isDev = process.env.NODE_ENV === 'dev';
const isBeta = process.env.APP_SATE === 'beta';

function removeOldEntries(absoluteDir) {
  for (const dirent of readdirSync(absoluteDir, { withFileTypes: true })) {
    const direntDir = join(absoluteDir, dirent.name);

    if (dirent.isFile()) {
      rmSync(direntDir, { force: true });
    } else if (dirent.isDirectory()) {
      removeOldEntries(direntDir);
    }
  }
}

function searchEntries(absoluteDir) {
  let entries = [];
  for (const dirent of readdirSync(absoluteDir, { withFileTypes: true })) {
    const direntDir = join(absoluteDir, dirent.name);

    if (dirent.isFile()) {
      entries.push(direntDir);
    } else if (dirent.isDirectory()) {
      entries.push(...searchEntries(direntDir));
    }
  }
  return entries;
}

function editFiles(absoluteDir) {
  for (const dirent of readdirSync(absoluteDir, { withFileTypes: true })) {
    const direntDir = join(absoluteDir, dirent.name);

    if (dirent.isFile()) {
      const fileContent = readFileSync(direntDir, 'utf-8');
      writeFileSync(direntDir, fileContent.replace(/\.js\"/gi, '.mjs"'));
    } else if (dirent.isDirectory()) {
      editFiles(direntDir);
    }
  }
}

(async function () {
  removeOldEntries(__destination);
  const entries = searchEntries(__source);
  await build({
    entryPoints: entries,
    platform: 'node',
    outdir: __destination,
    logLevel: 'debug',
    minify: !isDev && !isBeta,
    drop: !isDev && !isBeta ? ['console', 'debugger'] : [],
    treeShaking: !isDev && !isBeta,
    mangleQuoted: !isDev && !isBeta,
    format: 'esm',
    outExtension: { '.js': '.mjs' },
  });
  editFiles(__destination);
})();
