import { cmd } from '$libs/functions/commandHandler';
import { log, logLine } from '$libs/functions/log';
import { dict } from '$stores/dict';
import { get } from 'svelte/store';

cmd.registerCommand(() => {
	let availabilityMap = {
		both: get(dict).textFeedback.commands.commandList.availabilityMap.both,
		text: get(dict).textFeedback.commands.commandList.availabilityMap.text,
		speech: get(dict).textFeedback.commands.commandList.availabilityMap.speech,
	};

	logLine(get(dict).textFeedback.commands.commandList.list.wrapper);

	for (let [index, { name, syntax, availability, description }] of cmd.commandList.entries()) {
		log(get(dict).textFeedback.commands.commandList.list.name, name);
		log(get(dict).textFeedback.commands.commandList.list.availability, availabilityMap[availability]);
		log(get(dict).textFeedback.commands.commandList.list.syntax, syntax);
		log(get(dict).textFeedback.commands.commandList.list.description, description);
		if (index < cmd.commandList.length - 1) {
			log('');
		}
	}

	log(get(dict).textFeedback.commands.commandList.list.wrapper);
}, ['both', 'Parancsok', null, ['parancsok', 'commands', 'cmd', 'cmds', 'listcmds', 'listcmd'], get(dict).textFeedback.commands.commandList.description]);
