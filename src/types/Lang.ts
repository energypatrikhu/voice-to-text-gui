export interface Lang {
	speechFeedback: SpeechFeedback;
	textFeedback: TextFeedback;
	navigation: Navigation;
}

export interface Navigation {
	home: string;
	settings: string;
}

export interface SpeechFeedback {
	index: SpeechFeedbackIndex;
	commandHandler: CommandHandler;
	commands: SpeechFeedbackCommands;
}

export interface CommandHandler {
	unknownMacro: string;
	unknownCommand: string;
}

export interface SpeechFeedbackCommands {
	showActiveButtons: PurpleShowActiveButtons;
	mtaMode: PurpleMTAMode;
	exitMta: PurpleExitMTA;
	exit: PurpleExit;
	activeWindow: PurpleActiveWindow;
}

export interface PurpleActiveWindow {
	activeWindow: string;
}

export interface PurpleExit {
	closingApp: string;
}

export interface PurpleExitMTA {
	notInForeground: string;
}

export interface PurpleMTAMode {
	mtaConsoleInputMode: MTAConsoleInputMode;
}

export interface MTAConsoleInputMode {
	enabled: string;
	disabled: string;
}

export interface PurpleShowActiveButtons {
	showActiveButtons: MTAConsoleInputMode;
}

export interface SpeechFeedbackIndex {
	appStarted: string;
}

export interface TextFeedback {
	index: TextFeedbackIndex;
	soundWrapper: SoundWrapper;
	config: TextFeedbackConfig;
	commandHandler: CommandHandler;
	chromeInstance: ChromeInstance;
	commands: TextFeedbackCommands;
	chromeFunctions: ChromeFunctions;
}

export interface ChromeFunctions {
	speechRecognition: ChromeFunctionsSpeechRecognition;
}

export interface ChromeFunctionsSpeechRecognition {
	outputStopped: string;
	start: Start;
	info: Info;
	transcript: Transcript;
}

export interface Info {
	started: string;
	stopped: string;
	restarted: string;
	output: string;
}

export interface Start {
	outputPrefix: string;
}

export interface Transcript {
	partialOutput: string;
}

export interface ChromeInstance {
	chrome: ChromeInstanceChrome;
	exposingPageFunctions: string;
	speechRecognition: ChromeInstanceSpeechRecognition;
}

export interface ChromeInstanceChrome {
	navigating: string;
	registeringEvents: string;
}

export interface ChromeInstanceSpeechRecognition {
	starting: string;
}

export interface TextFeedbackCommands {
	showActiveButtons: FluffyShowActiveButtons;
	mtaMode: FluffyMTAMode;
	exitMta: FluffyExitMTA;
	exit: FluffyExit;
	commandList: CommandList;
	activeWindow: FluffyActiveWindow;
}

export interface FluffyActiveWindow {
	description: string;
	activeWindow: string;
}

export interface CommandList {
	description: string;
	list: List;
	availabilityMap: AvailabilityMap;
}

export interface AvailabilityMap {
	both: string;
	text: string;
	speech: string;
}

export interface List {
	wrapper: string;
	name: string;
	availability: string;
	syntax: string;
	description: string;
}

export interface FluffyExit {
	description: string;
	closingApp: string;
}

export interface FluffyExitMTA {
	description: string;
	notInForeground: string;
}

export interface FluffyMTAMode {
	description: string;
	mtaConsoleInputMode: MTAConsoleInputMode;
}

export interface FluffyShowActiveButtons {
	description: string;
	showActiveButtons: MTAConsoleInputMode;
}

export interface TextFeedbackConfig {
	macro: Macro;
	config: ConfigConfig;
}

export interface ConfigConfig {
	wrapper: string;
	broken: string;
	notExists: string;
	loaded: string;
	error: Error;
}

export interface Error {
	partialHoldToActivate: string;
	punctuationMarksPartial: string;
	gameChatPrefixesPartial: string;
	commandsPartial: string;
}

export interface Macro {
	notExists: string;
}

export interface TextFeedbackIndex {
	app: App;
	chrome: IndexChrome;
	registering: Registering;
	keyPressed: string;
	activeButtons: string;
	creatorsCredits: CreatorsCredits;
	commandsEnabled: string;
}

export interface App {
	loading: string;
	version: string;
	started: Started;
}

export interface Started {
	hold: string;
	toggle: string;
}

export interface IndexChrome {
	starting: string;
	initializing: string;
}

export interface CreatorsCredits {
	wrapper: string;
	createdBy: string;
	ideaBy: string;
}

export interface Registering {
	ioHook: string;
	commands: string;
}

export interface SoundWrapper {
	playingSound: string;
}
