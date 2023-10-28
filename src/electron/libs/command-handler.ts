import { stdin } from 'process';
import { createInterface } from 'readline';

import { anyHas } from './any-has.js';
import { __app } from './app.js';
import { textParser } from './text-parser.js';

import type { Macro } from '../../types/Macro.js';
import type { SpeechSynthesisEngine } from './speech-synthesis-engine.js';
type Command$Name = string;
type Command$Availability = 'text' | 'speech' | 'both';
type Command$Syntax = string | null;
type Command$Handler = string | string[];
type Command$Description = string | null;
type Command$Func = (speechSynthesis: SpeechSynthesisEngine, ...args: Array<any>) => Promise<void> | void;

type Macro$Handler = string;

interface Command {
	name: Command$Name;
	availability: Command$Availability;
	syntax: Command$Syntax;
	handler: Command$Handler;
	description: Command$Description;
	func: Command$Func;
	marco: boolean;
}

interface CmdParsed {
	handler: Command$Handler;
	args: any;
}

class CommandHandler {
	private commands: Array<Command> = [];
	private macros: Array<Macro> = __app.macros;
	private consoleInterface = createInterface({ input: stdin });
	private speechSynthesis!: SpeechSynthesisEngine;

	get commandList() {
		return this.commands;
	}
	get macroList() {
		return this.macros;
	}

	async init(speechSynthesis: SpeechSynthesisEngine) {
		this.speechSynthesis = speechSynthesis;

		await this.initCommands();
		this.initTextCommandHandler();
	}

	private async initCommands() {
		require('./commands/command-list.js');
		require('./commands/active-window.js');
		require('./commands/exit.js');
		require('./commands/exit-mta.js');
		require('./commands/mta-mode.js');
		require('./commands/show-active-buttons.js');
	}

	registerCommand(func: Command$Func, [availability, name, syntax, handler, description]: [Command$Availability, Command$Name, Command$Syntax, Command$Handler, Command$Description]) {
		this.commands.push({
			availability,
			name,
			syntax: syntax !== null ? syntax : typeof handler === 'object' ? __app.config.commands.prefix + handler.join(` | ${__app.config.commands.prefix}`) : __app.config.commands.prefix + handler,
			handler,
			description,
			func,
			marco: false,
		});
	}

	private async callMacro(handler: Macro$Handler, outputLocation: 'return' | 'write') {
		let filteredMacros = this.macros.filter((macro) => macro.handler === handler);

		if (filteredMacros.length > 0) {
			let macro = filteredMacros[0];

			if (outputLocation === 'return') {
				return macro.text;
			}

			if (__app.config.others.mtaConsoleInputMode) {
				return await textParser(`{f8}${macro.text}{enter}{f8}`);
			}

			return await textParser(macro.text);
		}

		this.speechSynthesis.speak(__app.dictionary.speechFeedback.commandHandler.unknownMacro);
		__app.console.debugLog(__app.dictionary.textFeedback.commandHandler.unknownMacro);
	}

	private async callCommand(command: string, availability: Command$Availability, ...args: any[]) {
		if (!__app.config.commands.enabled) {
			return;
		}

		let commandArray = command.slice(1).replace(/\s+/g, '').split(__app.config.commands.splitter);
		let cmd: CmdParsed = {
			handler: commandArray[0],
			args: commandArray.slice(1),
		};

		__app.console.debugLogJson({ cmd });

		if (typeof command === 'string' && anyHas(cmd.handler, ['makró', 'makrók', 'szöveg', 'szövegek'])) {
			return await this.callMacro(cmd.args[0], args.length ? args[0] : 'write');
		}

		let filteredCommands = this.commands.filter((_command) => (typeof _command.handler === 'object' ? anyHas(_command.handler, cmd.handler) : _command.handler === cmd.handler));

		if (filteredCommands.length > 0) {
			let command = filteredCommands[0];

			if (command.availability !== 'both') {
				if (command.availability !== availability) {
					return;
				}

				return await command.func(this.speechSynthesis, ...args, ...cmd.args);
			}

			return await command.func(this.speechSynthesis, ...args, ...cmd.args);
		}

		this.speechSynthesis.speak(__app.dictionary.speechFeedback.commandHandler.unknownCommand);
		__app.console.debugLog(__app.dictionary.textFeedback.commandHandler.unknownCommand);
	}

	private initTextCommandHandler() {
		this.consoleInterface.on('line', async (command) => {
			if (!command || command === undefined || command === null || command === '') {
				return;
			}
			if (!command.startsWith(__app.config.commands.prefix)) {
				return;
			}

			await this.callCommand(command, 'text');
		});
	}

	async voiceCommandHandler(command: string, ...args: any[]) {
		if (!command || command === undefined || command === null || command === '') {
			return;
		}
		if (!command.startsWith(__app.config.commands.prefix)) {
			return;
		}

		return await this.callCommand(command, 'speech', ...args);
	}

	async useCommand(command: string, ...args: any[]) {
		return (await this.callCommand(command, 'both', ...args))!;
	}
}

export const cmd = new CommandHandler();
