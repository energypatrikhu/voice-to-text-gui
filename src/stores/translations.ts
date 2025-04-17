import { writable } from "svelte/store";

import type { Translations } from "$types/Translations";
import type { Writable } from "svelte/store";

const translations = <Writable<Translations>>writable({});
export default translations;
