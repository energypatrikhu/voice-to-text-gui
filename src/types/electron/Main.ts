import type { ConfigOptions } from '../ConfigOptions';
import type { Translation } from '../Translation';
import type { Macro } from '../Macro';

export interface Main {
	config: ConfigOptions;
	macros: Array<Macro>;
	translation: Translation;
}
