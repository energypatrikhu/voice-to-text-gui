import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { Lang } from '$types/Lang';

export const dict = <Writable<Lang>>writable({});
