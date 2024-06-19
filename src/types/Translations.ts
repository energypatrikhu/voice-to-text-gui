export interface Translations {
  speechFeedback: SpeechFeedback;
  textFeedback: TextFeedback;
  states: States;
  time: Time;
  buttons: Buttons;
  navigation: Navigation;
  console: Console;
  firstStart: FirstStart;
  settings: Settings;
}

export interface Buttons {
  add: string;
  remove: string;
  save: string;
  cancel: string;
  reset: string;
}

export interface Console {
  input: ConsoleInput;
}

export interface ConsoleInput {
  placeholder: string;
  submit: string;
}

export interface FirstStart {
  global: Global;
  chrome: FirstStartChrome;
}

export interface FirstStartChrome {
  check: string;
  no_update: string;
  update: string;
  done: string;
  fail: string;
}

export interface Global {
  run: string;
  done: string;
  skip: string;
}

export interface Navigation {
  home: string;
  settings: string;
  macros: string;
  info: string;
}

export interface Settings {
  logs: Logs;
  update: SettingsUpdate;
  input: SettingsInput;
  output: Output;
  feedback: Feedback;
  speechRecognition: SettingsSpeechRecognition;
  replacers: Replacers;
  windowAllowList: WindowAllowList;
  commands: SettingsCommands;
  macros: SettingsMacros;
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
  sounds: Sounds;
  speech: Prefix;
  volume: Prefix;
  language: Prefix;
}

export interface Sounds {
  name: string;
  description: string;
  audioMode: Prefix;
  customAudioFile: CustomAudioFile;
  audioVolume: Prefix;
}

export interface CustomAudioFile {
  name: string;
  description: string;
  select: string;
  selected: string;
}

export interface SettingsInput {
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

export interface SettingsMacros {
  this: Prefix;
  macros: MacrosMacros;
}

export interface MacrosMacros {
  name: string;
  description: string;
  table: MacrosTable;
  modal: MacrosModal;
}

export interface MacrosModal {
  titles: FluffyTitles;
  prefix: string;
  text: string;
}

export interface FluffyTitles {
  'add-macro': string;
  'edit-macro': string;
  'remove-macro': string;
}

export interface MacrosTable {
  prefix: string;
  text: string;
  button: string;
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
  titles: TentacledTitles;
  wordPhrase: string;
}

export interface TentacledTitles {
  'add-item': string;
  'edit-item': string;
  'remove-item': string;
}

export interface CustomWordsAndPhrasesTable {
  title: string;
  button: string;
}

export interface SettingsUpdate {
  this: Prefix;
  checkOnStartup: Prefix;
  allowPrerelease: Prefix;
  allowDowngrade: Prefix;
  autoCheck: Prefix;
  checkInterval: Prefix;
  checkChromeUpdates: Prefix;
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
  titles: TentacledTitles;
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
  updateApp: UpdateAppClass;
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

export interface UpdateAppClass {
  updateAvailable: string;
}

export interface SpeechFeedbackIndex {
  appStarted: string;
  updater: UpdateAppClass;
}

export interface States {
  disabled: string;
  enabled: string;
  active: string;
  inactive: string;
  activated: string;
  deactivated: string;
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
  updateApp: UpdateApp;
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

export interface UpdateApp {
  description: string;
  checkingUpdate: string;
  noUpdateAvailable: string;
  updateAvailable: string;
}

export interface TextFeedbackConfig {
  macro: Macro;
  config: ConfigConfig;
  translations: Macro;
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

export interface Macro {
  loaded: string;
}

export interface TextFeedbackIndex {
  app: App;
  chrome: IndexChrome;
  updater: Updater;
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

export interface Updater {
  starting: string;
  updateAvailable: string;
  updateDownloading: string;
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
