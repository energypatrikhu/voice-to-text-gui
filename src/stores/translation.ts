import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { Translation } from '$types/Translation';

export const translations = <Writable<Translation>>writable({});
