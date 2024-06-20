import { join, resolve } from 'path';

import { __app } from './app.js';

export function soundWrapper() {
  try {
    if (!__app.config.feedback.sounds.enabled) {
      return;
    }

    __app.console.debugLog(__app.translations.textFeedback.soundWrapper.playingSound);

    __app.mainWindow.webContents.send('electron', {
      event: 'playAudio',
      data: {
        src:
          __app.config.feedback.sounds.mode === 'custom'
            ? __app.config.feedback.sounds.file.filepath
            : resolve(
                join(__app.isDev ? './resources/extraResources/audio' : './resources/audio', '/activation-deactivation.mp3'),
              ),
        volume: __app.config.feedback.sounds.volume,
      },
    });
  } catch (error) {
    __app.console.debugErrorLog(error);
  }
}
