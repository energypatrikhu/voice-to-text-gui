import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { Translations } from '$types/Translations';

const translations = <Writable<Translations>>writable({});
export default translations;
