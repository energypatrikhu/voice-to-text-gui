import { writable } from "svelte/store";

import type { App } from "$types/App";
import type { Writable } from "svelte/store";

const app = <Writable<App>>writable({ ready: false });
export default app;
