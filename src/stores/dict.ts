import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { Dictionary } from '$types/Dictionary';

export const dict = <Writable<Dictionary>>writable({});
