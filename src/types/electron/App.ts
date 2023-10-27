import type { ConfigOptions } from '$types/ConfigOptions';
import type { Macro } from '$types/Macro';
import type { Versions } from '$types/electron/Versions';

export interface App {
	config: ConfigOptions;
	macros: Array<Macro>;
	versions: Versions;
}
