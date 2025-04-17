import { existsSync, readdirSync, rmSync, statSync } from "fs";
import { join, resolve } from "path";

function removeFileOrDirectory(path) {
  try {
    rmSync(path, { recursive: true, force: true });
    console.log("Removed:", path);
  } catch {
    console.log("Failed to remove:", path);
  }
}

function removeDirectoryRecursively(absPath) {
  for (const dirent of readdirSync(absPath, { withFileTypes: true })) {
    const direntDir = join(absPath, dirent.name);

    if (dirent.isFile()) {
      removeFileOrDirectory(direntDir);
    } else if (dirent.isDirectory()) {
      removeDirectoryRecursively(direntDir);
    }
  }
}

for (const rawPath of process.argv.slice(2)) {
  const path = resolve(rawPath);

  if (!existsSync(path)) {
    console.log("Path does not exist:", path);
    continue;
  }

  const stat = statSync(path);

  if (stat.isFile()) {
    removeFileOrDirectory(path);
  } else if (stat.isDirectory()) {
    removeDirectoryRecursively(path);
  }
}
