import { EventEmitter } from 'puppeteer-core';

import { __app } from './app.js';

export class SpeechSynthesisEngine {
  private isSpeechFinished: boolean = true;

  private pageEmitter = new EventEmitter();

  async init() {
    await this.initExposeFunctions();
    await this.initEngine();

    return this;
  }

  private async initExposeFunctions() {
    this.pageEmitter.on('speech:synthesis:finished', () => this.speechFinished());
    await __app.chromePage.exposeFunction('callSpeechSynthesisFinished', (info: any) =>
      this.pageEmitter.emit('speech:synthesis:finished', info),
    );
  }

  private async initEngine() {
    await __app.chromePage.evaluate(
      (speechSynthesisOptions) => {
        const voices = Array.from(window.speechSynthesis.getVoices());

        window.speechSynthesisOptions = {
          lang: speechSynthesisOptions.language || voices.filter((voice) => voice.default)[0].lang,
          voice: voices.filter((voice) => voice.lang.includes(speechSynthesisOptions.language))[0],
          volume: speechSynthesisOptions.volume,
        };
      },
      { language: __app.config.feedback.language, volume: __app.config.feedback.speech.volume },
    );
  }

  updateEngine() {
    this.initEngine();
  }

  async speak(text: string) {
    this.isSpeechFinished = false;

    await __app.chromePage.evaluate((text) => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.voice = window.speechSynthesisOptions.voice;
      utterance.volume = window.speechSynthesisOptions.volume;

      window.speechSynthesis.speak(utterance);

      utterance.addEventListener('end', window.callSpeechSynthesisFinished);
    }, text);

    return await this.awaitSpeechFinished();
  }

  private speechFinished() {
    this.isSpeechFinished = true;
  }

  private awaitSpeechFinished() {
    return new Promise<void>((resolve) => {
      const awaitPromise = () => {
        if (this.isSpeechFinished) {
          this.isSpeechFinished = true;
          return setTimeout(resolve, 500);
        }
        setTimeout(awaitPromise, 0);
      };
      awaitPromise();
    });
  }
}
