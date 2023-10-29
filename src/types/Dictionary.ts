export interface Dictionary {
	speechFeedback: SpeechFeedback;
	textFeedback: TextFeedback;
	states: States;
	buttons: EnButtons;
	navigation: Navigation;
	settings: Settings;
}

export interface EnButtons {
	add: string;
	remove: string;
	save: string;
	cancel: string;
}

export interface Navigation {
	home: string;
	settings: string;
	macros: string;
	info: string;
}

export interface Settings {
	logs: Logs;
	input: Input;
	output: Output;
	feedback: Feedback;
	speechRecognition: SettingsSpeechRecognition;
	replacers: Replacers;
	windowAllowList: WindowAllowList;
	commands: SettingsCommands;
	others: Others;
}

export interface SettingsCommands {
	this: Prefix;
	prefix: Prefix;
	splitter: Prefix;
}

export interface Prefix {
	name: string;
	description: string;
}

export interface Feedback {
	this: Prefix;
	sounds: Prefix;
	speech: Prefix;
	volume: Prefix;
	language: Prefix;
}

export interface Input {
	this: Prefix;
	holdToActivate: Prefix;
	keyboardShortcuts: KeyboardShortcuts;
	autoRelease: Prefix;
	releaseTime: Prefix;
}

export interface KeyboardShortcuts {
	name: string;
	description: string;
	table: KeyboardShortcutsTable;
	modal: KeyboardShortcutsModal;
}

export interface KeyboardShortcutsModal {
	titles: PurpleTitles;
	prefix: string;
	shortcut: string;
	buttons: ModalButtons;
}

export interface ModalButtons {
	'add-button': string;
	'remove-button': string;
}

export interface PurpleTitles {
	'add-shortcut': string;
	'edit-shortcut': string;
	'remove-shortcut': string;
}

export interface KeyboardShortcutsTable {
	prefix: string;
	shortcut: string;
	button: string;
}

export interface Logs {
	this: Prefix;
	debug: Prefix;
	saveToFile: Prefix;
}

export interface Others {
	this: Prefix;
	mtaConsoleInputMode: Prefix;
	showActiveButtons: Prefix;
}

export interface Output {
	this: Prefix;
	partial: Prefix;
	animated: Prefix;
	typingDelay: Prefix;
}

export interface Replacers {
	this: Prefix;
	punctuationMarks: Prefix;
	gameChatPrefixes: Prefix;
}

export interface SettingsSpeechRecognition {
	this: Prefix;
	language: Prefix;
	customWordsAndPhrases: CustomWordsAndPhrases;
}

export interface CustomWordsAndPhrases {
	name: string;
	description: string;
	table: CustomWordsAndPhrasesTable;
	modal: CustomWordsAndPhrasesModal;
}

export interface CustomWordsAndPhrasesModal {
	titles: FluffyTitles;
	wordPhrase: string;
}

export interface FluffyTitles {
	'add-item': string;
	'edit-item': string;
	'remove-item': string;
}

export interface CustomWordsAndPhrasesTable {
	title: string;
	button: string;
}

export interface WindowAllowList {
	this: Prefix;
	windows: Windows;
}

export interface Windows {
	name: string;
	description: string;
	table: CustomWordsAndPhrasesTable;
	modal: WindowsModal;
}

export interface WindowsModal {
	titles: FluffyTitles;
	windowName: string;
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

export interface States {
	disabled: string;
	enabled: string;
	active: string;
	inactive: string;
	actived: string;
	deactived: string;
	none: string;
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
	macro: Dictionary;
	config: ConfigConfig;
	dictionary: Dictionary;
}

export interface ConfigConfig {
	wrapper: string;
	loaded: string;
	error: Error;
}

export interface Error {
	partialHoldToActivate: string;
	punctuationMarksPartial: string;
	gameChatPrefixesPartial: string;
	commandsPartial: string;
}

export interface Dictionary {
	loaded: string;
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
