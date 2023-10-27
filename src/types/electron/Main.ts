import type { ConfigOptions } from '../ConfigOptions';
import type { Dictionary } from '../Dictionary';
import type { Macro } from '../Macro';

export interface Main {
	config: ConfigOptions;
	macros: Array<Macro>;
	dictionary: Dictionary;
}
