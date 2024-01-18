import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { Translations } from '$types/Translations';

export const translations = <Writable<Translations>>writable({});
