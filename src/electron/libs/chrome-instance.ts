import { join, resolve } from "path";
import { launch } from "puppeteer-core";

import { __app } from "./app.js";

class ChromeInstance {
  async init() {
    try {
      const chromeInstance = await launch({
        headless: true,
        executablePath: resolve(
          join(
            __app.isDev ? "./resources/extraResources" : "./resources",
            "chrome/chrome.exe",
          ),
        ),
      });

      const page = (await chromeInstance.pages())[0];

      await page.goto("chrome://version");

      return page;
    } catch (error: any) {
      __app.console.debugErrorLog(error.message ?? error);
      throw error;
    }
  }
}

export { ChromeInstance };
