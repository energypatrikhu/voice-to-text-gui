import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';
import app from '$stores/app';

import type { Writable } from 'svelte/store';
import type { Macro } from '$types/Macro';

const macros = <Writable<Array<Macro>>>writable([]);
export default macros;

macros.subscribe(function (values) {
  if (browser && get(app).ready) {
    window.electron.send('electron', {
      event: 'macros',
      data: values,
    });
  }
});
