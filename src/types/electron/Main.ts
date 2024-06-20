import type { ConfigOptions } from '../ConfigOptions';
import type { Translations } from '../Translations';
import type { Macro } from '../Macro';

export interface Main {
  config: ConfigOptions;
  macros: Array<Macro>;
  translations: Translations;
}
