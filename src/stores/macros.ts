import { browser } from '$app/environment';
import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { Macro } from '$types/Macro';

export const macros = <Writable<Array<Macro>>>writable([]);

let isReady = false;

export function setReady(state: boolean) {
  isReady = state;

  console.log('setReady', { isReady });
}

macros.subscribe(function (values) {
  if (browser) {
    if (browser && isReady) {
      window.electron.send('electron', {
        event: 'macros',
        data: values,
      });
    }
  }
});
