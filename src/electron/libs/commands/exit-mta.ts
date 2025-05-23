import { __app } from "../app.js";
import { cmd } from "../command-handler.js";
import { getActiveWindowName } from "../get-active-window-name.js";
import { printTextSegments } from "../press-keys.js";

cmd.registerCommand(
  async function (speechSynthesis) {
    try {
      if (
        !["gta_sa.exe", "proxy_sa.exe"].includes(await getActiveWindowName())
      ) {
        __app.console.log(
          __app.translations.textFeedback.commands.exitMta.notInForeground,
        );
        speechSynthesis.speak(
          __app.translations.speechFeedback.commands.exitMta.notInForeground,
        );
        return;
      }

      await printTextSegments("exit", true);
    } catch (error) {
      __app.console.debugErrorLog(error);
    }
  },
  [
    "both",
    "MTA:SA Bezárás",
    null,
    ["mtabezárás", "mtakilépés", "closemta", "exitmta"],
    __app.translations.textFeedback.commands.exitMta.description,
  ],
);
