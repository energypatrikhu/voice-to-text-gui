import { existsSync, readFileSync } from "fs";
import { join, resolve } from "path";

import { __app } from "./app.js";

import type { Translations } from "../../types/Translations.js";

export function loadTranslation(): Translations {
  const translationsPath = resolve(
    join(
      __app.isDev ? "./resources/extraResources" : "./resources",
      "translations",
    ),
  );

  if (
    existsSync(
      join(translationsPath, `/${__app.config.feedback.language}.json`),
    )
  ) {
    return JSON.parse(
      readFileSync(
        join(translationsPath, `/${__app.config.feedback.language}.json`),
        "utf-8",
      ),
    );
  }

  return JSON.parse(readFileSync(join(translationsPath, `/en.json`), "utf-8"));
}
