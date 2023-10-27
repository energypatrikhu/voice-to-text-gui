import { EventEmitter, Page } from 'puppeteer-core';

import type { ConfigOptions } from '../../types/ConfigOptions.js';
import type { Console } from './console.js';

export class SpeechSynthesisEngine {
	private page;
	private isSpeechFinished: boolean = true;

	private pageEmitter = new EventEmitter();

	constructor(page: Page) {
		this.page = page;
	}

	async init(feedback: ConfigOptions['feedback']) {
		await this.initExposeFunctions();
		await this.initEngine({ language: feedback.language, volume: feedback.speech.volume });

		return this;
	}

	private async initExposeFunctions() {
		this.pageEmitter.on('speech:synthesis:finished', () => this.speechFinished());
		await this.page.exposeFunction('callSpeechSynthesisFinished', (info: any) => this.pageEmitter.emit('speech:synthesis:finished', info));
	}

	private async initEngine(speechSynthesisOptions: any) {
		await this.page.evaluate((speechSynthesisOptions) => {
			const voices = Array.from(window.speechSynthesis.getVoices());

			window.speechSynthesisOptions = {
				lang: speechSynthesisOptions.language || voices.filter((voice) => voice.default)[0].lang,
				voice: voices.filter((voice) => voice.lang.includes(speechSynthesisOptions.language))[0],
				volume: speechSynthesisOptions.volume,
			};
		}, speechSynthesisOptions);
	}

	async speak(text: string) {
		this.isSpeechFinished = false;

		await this.page.evaluate((text) => {
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
