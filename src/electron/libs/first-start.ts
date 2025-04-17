import { __app } from "./app.js";
import { saveManifest } from "./manifest.js";

export function firstStart() {
  if (__app.isDev) return;

  saveManifest({ isFirstStart: false });
}
