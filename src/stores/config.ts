import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';
import app from '$stores/app';

import type { Writable } from 'svelte/store';
import type { ConfigOptions } from '$types/ConfigOptions';

const config = <Writable<ConfigOptions>>writable({});
export default config;

config.subscribe(function (values) {
  if (browser && get(app).ready) {
    window.electron.send('electron', {
      event: 'config',
      data: values,
    });
  }
});
