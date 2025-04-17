import type { ConfigOptions } from "../ConfigOptions";
import type { Macro } from "../Macro";
import type { Translations } from "../Translations";

export interface Main {
  config: ConfigOptions;
  macros: Array<Macro>;
  translations: Translations;
}
