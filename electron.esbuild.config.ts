import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "fs";
import { join } from "path";

const __source = "./src/electron";
const __destination = "./resources/app";
const isDev = process.env.NODE_ENV === "dev";
const isBeta = process.env.APP_SATE === "beta";

if (!existsSync(__destination)) {
  mkdirSync(__destination, { recursive: true });
}

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
    let direntDir = join(absoluteDir, dirent.name);

    if (dirent.isFile()) {
      const fileContent = readFileSync(direntDir, "utf-8");

      direntDir = direntDir.replace(/\.js$/, ".mjs");
      writeFileSync(direntDir, fileContent.replace(/\.js\"/gi, '.mjs"'));

      rmSync(join(absoluteDir, dirent.name), { force: true });
    } else if (dirent.isDirectory()) {
      editFiles(direntDir);
    }
  }
}

(async function () {
  removeOldEntries(__destination);

  await Bun.build({
    entrypoints: searchEntries(__source),
    root: __source,
    outdir: __destination,
    drop: !isDev && !isBeta ? ["console", "debugger"] : [],
    minify: true,
    splitting: true,
    target: "node",
    format: "esm",
    packages: "external",
  });

  editFiles(__destination);
})();
