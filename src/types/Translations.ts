export interface Translations {
	speechFeedback: SpeechFeedback;
	textFeedback: TextFeedback;
	states: States;
	time: Time;
	buttons: EnButtons;
	navigation: Navigation;
	console: Console;
	settings: Settings;
}

export interface States {
	disabled: string;
	enabled: string;
	active: string;
	inactive: string;
	actived: string;
	deactived: string;
	none: string;
	enable: string;
	disable: string;
	on: string;
	off: string;
	onLong: string;
	offLong: string;
	onMid: string;
	offMid: string;
	custom: string;
	default: string;
}

export interface EnButtons {
	add: string;
	remove: string;
	save: string;
	cancel: string;
	reset: string;
}

export interface Navigation {
	home: string;
	settings: string;
	macros: string;
	info: string;
}

export interface Console {
	input: ConsoleInput;
}

export interface ConsoleInput {
	placeholder: string;
	submit: string;
}

export interface Settings {
	logs: Logs;
	update: SettingsUpdate;
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
	this: TartuGecko;
	prefix: TartuGecko;
	splitter: TartuGecko;
}

export interface TartuGecko {
	name: string;
	description: string;
}

export interface Feedback {
	this: TartuGecko;
	sounds: Sounds;
	speech: TartuGecko;
	volume: TartuGecko;
	language: TartuGecko;
}

export interface Sounds {
	name: string;
	description: string;
	audioMode: TartuGecko;
	customAudioFile: CustomAudioFile;
	audioVolume: TartuGecko;
}

export interface CustomAudioFile {
	name: string;
	description: string;
	select: string;
	selected: string;
}

export interface Input {
	this: TartuGecko;
	holdToActivate: TartuGecko;
	keyboardShortcuts: KeyboardShortcuts;
	autoRelease: TartuGecko;
	releaseTime: TartuGecko;
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
	this: TartuGecko;
	debug: TartuGecko;
	saveToFile: TartuGecko;
}

export interface Others {
	this: TartuGecko;
	mtaConsoleInputMode: TartuGecko;
	showActiveButtons: TartuGecko;
}

export interface Output {
	this: TartuGecko;
	partial: TartuGecko;
	animated: TartuGecko;
	typingDelay: TartuGecko;
}

export interface Replacers {
	this: TartuGecko;
	punctuationMarks: TartuGecko;
	gameChatPrefixes: TartuGecko;
}

export interface SettingsSpeechRecognition {
	this: TartuGecko;
	language: TartuGecko;
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

export interface SettingsUpdate {
	this: TartuGecko;
	checkOnStartup: TartuGecko;
	allowPrerelease: TartuGecko;
	allowDowngrade: TartuGecko;
	autoCheck: TartuGecko;
	checkInterval: TartuGecko;
}

export interface WindowAllowList {
	this: TartuGecko;
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
	updateApp: PurpleUpdateApp;
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

export interface PurpleUpdateApp {
	updateAvailabe: string;
}

export interface SpeechFeedbackIndex {
	appStarted: string;
	updater: PurpleUpdater;
}

export interface PurpleUpdater {
	updateAvailable: string;
}

export interface TextFeedback {
	index: TextFeedbackIndex;
	soundWrapper: SoundWrapper;
	config: TextFeedbackConfig;
	commandHandler: CommandHandler;
	chromeInstance: ChromeInstance;
	update: TextFeedbackUpdate;
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
	updateApp: FluffyUpdateApp;
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

export interface FluffyUpdateApp {
	description: string;
	checkingUpdate: string;
	noUpdateAvailabe: string;
	updateAvailabe: string;
}

export interface TextFeedbackConfig {
	macro: Translations;
	config: ConfigConfig;
	translations: Translations;
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

export interface Translations {
	loaded: string;
}

export interface TextFeedbackIndex {
	app: App;
	chrome: IndexChrome;
	updater: FluffyUpdater;
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

export interface FluffyUpdater {
	starting: string;
	updateAvailable: string;
}

export interface SoundWrapper {
	playingSound: string;
}

export interface TextFeedbackUpdate {
	checkAppUpdate: CheckAppUpdate;
}

export interface CheckAppUpdate {
	checkingUpdate: string;
	upToDate: string;
	notUpToDate: string;
	updateDownloaded: string;
}

export interface Time {
	normal: Normal;
	short: Normal;
}

export interface Normal {
	ms: string;
	s: string;
	m: string;
	h: string;
	d: string;
	w: string;
	mo: string;
	y: string;
}
