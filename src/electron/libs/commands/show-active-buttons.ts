import { __app } from "../app.js";
import { cmd } from "../command-handler.js";
import { saveConfig } from "../config.js";

cmd.registerCommand(
  async function (speechSynthesis) {
    __app.config.others.showActiveButtons =
      !__app.config.others.showActiveButtons;
    saveConfig(__app.config);

    if (__app.config.others.showActiveButtons) {
      __app.console.log(
        __app.translations.textFeedback.commands.showActiveButtons
          .showActiveButtons.enabled,
      );
      speechSynthesis.speak(
        __app.translations.speechFeedback.commands.showActiveButtons
          .showActiveButtons.enabled,
      );
    } else {
      __app.console.log(
        __app.translations.textFeedback.commands.showActiveButtons
          .showActiveButtons.disabled,
      );
      speechSynthesis.speak(
        __app.translations.speechFeedback.commands.showActiveButtons
          .showActiveButtons.disabled,
      );
    }
  },
  [
    "both",
    "Aktív Gombok",
    null,
    ["aktívgombok", "activebuttons"],
    __app.translations.textFeedback.commands.showActiveButtons.description,
  ],
);
