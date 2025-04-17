import activeWindow from "active-win";
import { basename } from "path";

import { __app } from "./app.js";

export async function getActiveWindowName() {
  const result = await activeWindow();

  if (!result) {
    return "";
  }

  __app.console.debugLogJson({ result });

  return basename(result.owner.path);
}
