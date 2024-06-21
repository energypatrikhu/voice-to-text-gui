<script lang="ts">
  import '../app.css';
  import Loading from '$components/Loading.svelte';

  import { onMount } from 'svelte';
  import config from '$stores/config';
  import macros from '$stores/macros';
  import translations from '$stores/translations';
  import app from '$stores/app';

  import { getLocaleTime } from '$libs/functions/getLocaleTime';
  import { updateConsoleStore } from '$stores/console';

  window.audioPlayback = new Audio();

  window.addEventListener('mouseup', function (mouseEvent) {
    if ([1, 3, 4].includes(mouseEvent.button)) {
      mouseEvent.preventDefault();
      mouseEvent.stopPropagation();
    }
  });

  document.addEventListener('auxclick', function (mouseEvent) {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
  });

  let ready = false;

  window.electron.receive('electron', function ({ event, data }) {
    switch (event) {
      case 'ready': {
        $config = data.config;
        $macros = data.macros;
        $translations = data.translations;
        $app = { ...$app, ...data.versions };
        ready = true;
        break;
      }

      case 'log': {
        updateConsoleStore(data);
        window.electron.send('electron', { event: 'log', data: { ...data, filename: $app.startupDate + '.log' } });
        break;
      }

      case 'translations': {
        $translations = data.translations;
        break;
      }

      case 'config': {
        $config = data.config;
        break;
      }

      case 'macros': {
        $macros = data.macros;
        break;
      }

      case 'selectAudioFile': {
        if (data) {
          $config.feedback.sounds.file = data;
        }
        break;
      }

      case 'playAudio': {
        if (data.src && data.volume) {
          window.audioPlayback.src = data.src;
          window.audioPlayback.volume = data.volume;
          window.audioPlayback.play();
        }
        break;
      }

      case 'loaded': {
        $app.mode = data.mode;
        $app.ready = true;
        break;
      }
    }
  });

  async function loadSettings() {
    console.log("setting 'startupDate'");
    $app.startupDate = getLocaleTime();
  }

  onMount(async function () {
    await loadSettings();

    window.electron.send('electron', {
      event: 'ready',
      data: null,
    });
  });
</script>

{#if ready}
  <slot />
{:else}
  <div class="absolute flex justify-center items-center h-full w-full">
    <Loading />
  </div>
{/if}
