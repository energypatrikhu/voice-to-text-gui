/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="@types/dom-speech-recognition" />
declare interface Window {
	electron: {
		send: (channel: string, data: { event: string; data: any }) => void;
		sendSync: (channel: string, data: { event: string; data: any }) => void;
		receive: (channel: string, func: (data: { event: string; data: any }) => void) => void;
		getVersion: () => void;
	};
	speechRecognition: SpeechRecognition;
	webkitspeechRecognition: webkitSpeechRecognition;

	speechRecognitionEnabled: boolean;
	speechRecognitionRestart: boolean;

	callSpeechRecognitionTranscript: (transcript: string) => void;
	callSpeechRecognitionInfo: (info: 'started' | 'stopped') => void;

	speechSynthesisOptions: { volume: number; lang: string; voice: SpeechSynthesisVoice };
}
