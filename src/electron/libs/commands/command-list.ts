import { __app } from '../app.js';
import { cmd } from '../command-handler.js';

cmd.registerCommand(
  function () {
    const availabilityMap = {
      both: __app.translations.textFeedback.commands.commandList.availabilityMap.both,
      text: __app.translations.textFeedback.commands.commandList.availabilityMap.text,
      speech: __app.translations.textFeedback.commands.commandList.availabilityMap.speech,
    };

    const commands = [];

    commands.push(__app.translations.textFeedback.commands.commandList.list.wrapper);

    for (const [index, { name, syntax, availability, description }] of cmd.commandList.entries()) {
      commands.push(`${__app.translations.textFeedback.commands.commandList.list.name} ${name}`);
      commands.push(
        `${__app.translations.textFeedback.commands.commandList.list.availability} ${availabilityMap[availability]}`,
      );
      commands.push(`${__app.translations.textFeedback.commands.commandList.list.syntax} ${syntax}`);
      commands.push(`${__app.translations.textFeedback.commands.commandList.list.description} ${description}`);
      if (index < cmd.commandList.length - 1) {
        commands.push('');
      }
    }

    commands.push(__app.translations.textFeedback.commands.commandList.list.wrapper);

    __app.console.logJson(commands.join('\n'));
  },
  [
    'both',
    'Parancsok',
    null,
    ['parancsok', 'commands', 'cmd', 'cmds', 'listcmds', 'listcmd'],
    __app.translations.textFeedback.commands.commandList.description,
  ],
);
