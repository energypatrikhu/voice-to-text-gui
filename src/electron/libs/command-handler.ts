import { anyHas } from './any-has.js';
import { __app } from './app.js';
import { textParser } from './text-parser.js';

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
  private speechSynthesis!: SpeechSynthesisEngine;

  get commandList() {
    return this.commands;
  }
  get macroList() {
    return __app.macros;
  }

  async init(speechSynthesis: SpeechSynthesisEngine) {
    this.speechSynthesis = speechSynthesis;

    await this.initCommands();
  }

  private async initCommands() {
    const commandFiles = [
      './commands/command-list.js',
      './commands/active-window.js',
      './commands/exit.js',
      './commands/exit-mta.js',
      './commands/mta-mode.js',
      './commands/show-active-buttons.js',
      './commands/update-app.js',
    ];

    for (const file of commandFiles) {
      require(file);
    }
  }

  registerCommand(
    func: Command$Func,
    [availability, name, syntax, handler, description]: [
      Command$Availability,
      Command$Name,
      Command$Syntax,
      Command$Handler,
      Command$Description,
    ],
  ) {
    this.commands.push({
      availability,
      name,
      syntax:
        syntax !== null
          ? syntax
          : typeof handler === 'object'
          ? __app.config.commands.prefix + handler.join(` | ${__app.config.commands.prefix}`)
          : __app.config.commands.prefix + handler,
      handler,
      description,
      func,
      marco: false,
    });
  }

  private async callMacro(handler: Macro$Handler, outputLocation: 'return' | 'write') {
    const filteredMacros = __app.macros.filter((macro) => macro.handler === handler);

    __app.console.debugLogJson({ filteredMacros, outputLocation });

    if (filteredMacros.length === 0) {
      this.speechSynthesis.speak(__app.translations.speechFeedback.commandHandler.unknownMacro);
      __app.console.log(__app.translations.textFeedback.commandHandler.unknownMacro);
      return;
    }

    const macro = filteredMacros[0];

    if (outputLocation === 'return') {
      return macro.text;
    }

    if (__app.config.others.mtaConsoleInputMode) {
      return await textParser(`{f8}${macro.prefix ? `${macro.prefix.slice(1)} ` : 'say '}${macro.text}{enter}{f8}`);
    }

    return await textParser(`${macro.prefix ? `${macro.prefix} ` : ''}${macro.text}`);
  }

  private async callCommand(command: string, availability: Command$Availability, ...args: any[]) {
    if (!__app.config.commands.enabled) {
      return;
    }

    const commandArray = command.slice(1).replace(/\s+/g, '').split(__app.config.commands.splitter);
    const cmd: CmdParsed = {
      handler: commandArray[0],
      args: commandArray.slice(1),
    };

    __app.console.debugLogJson({
      cmd,
      isMacro: anyHas(cmd.handler, ['makró', 'makrók', 'szöveg', 'szövegek', 'macro', 'macros', 'text', 'texts']),
    });

    if (
      __app.config.macros.enabled &&
      anyHas(cmd.handler, ['makró', 'makrók', 'szöveg', 'szövegek', 'macro', 'macros', 'text', 'texts'])
    ) {
      if (cmd.args.length === 0) {
        this.speechSynthesis.speak(__app.translations.speechFeedback.commandHandler.unknownMacro);
        __app.console.log(__app.translations.textFeedback.commandHandler.unknownMacro);
        return;
      }

      __app.console.debugLogJson({ macros: __app.macros });

      return await this.callMacro(cmd.args[0], args.length !== 0 ? args[0] : 'write');
    }

    const filteredCommands = this.commands.filter((_command) =>
      typeof _command.handler === 'object' ? anyHas(_command.handler, cmd.handler) : _command.handler === cmd.handler,
    );

    if (filteredCommands.length > 0) {
      const command = filteredCommands[0];

      if (command.availability !== 'both') {
        if (command.availability !== availability) {
          return;
        }

        return await command.func(this.speechSynthesis, ...args, ...cmd.args);
      }

      return await command.func(this.speechSynthesis, ...args, ...cmd.args);
    }

    this.speechSynthesis.speak(__app.translations.speechFeedback.commandHandler.unknownCommand);
    __app.console.log(__app.translations.textFeedback.commandHandler.unknownCommand);
  }

  async textCommandHandler(command: string, ...args: any[]) {
    if (!command || command === undefined || command === null || command === '') {
      return;
    }
    // if (!command.startsWith(__app.config.commands.prefix)) {
    // 	return;
    // }

    await this.callCommand(command, 'text', ...args);
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
