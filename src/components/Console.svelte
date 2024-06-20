<script lang="ts">
  import { eConsole } from '$stores/console';
  import { dateToLocale } from '$libs/functions/dateToLocale';
  import { onMount } from 'svelte';
  import Highlight from 'svelte-highlight';
  import languageJson from 'svelte-highlight/languages/json';
  import languagePlaintext from 'svelte-highlight/languages/plaintext';
  import 'svelte-highlight/styles/github-dark-dimmed.css';
  import { app } from '../stores/app';

  let consoleWrapper: HTMLDivElement;

  eConsole.subscribe(function () {
    setTimeout(function () {
      if (!consoleWrapper) return;
      consoleWrapper.scrollTo(0, consoleWrapper.scrollHeight);
    }, 0);
  });

  onMount(function () {
    consoleWrapper.scrollTo(0, consoleWrapper.scrollHeight);
  });

  const colorCodes = {
    Error: 'bg-red-800',
    Info: 'bg-neutral-800',
    Warning: 'bg-orange-800',
  };
</script>

<div
  bind:this="{consoleWrapper}"
  class="fixed overflow-hidden overflow-y-scroll w-full {$app.ready
    ? 'h-[calc(100%-48px-36px)]'
    : 'h-[calc(100%-48px)]'} flex flex-col"
>
  {#each $eConsole as { type, severity, timestamp, lang, textArray }}
    <div class="w-full {colorCodes[severity]} border-t border-t-neutral-600">
      <div class="sticky top-0 {colorCodes[severity]} px-4 py-1">
        <span>[{type}]</span>
        <span>[{dateToLocale(timestamp)}]</span>
        <span>[{severity}]</span>
      </div>
      <Highlight
        class="bg-inherit"
        language="{lang === 'json' ? languageJson : languagePlaintext}"
        code="{textArray.join(' ')}"
      />
    </div>
  {/each}
</div>

<style>
  :global(code.hljs) {
    @apply bg-inherit whitespace-pre-wrap text-gray-300;
  }
  :global(code.hljs *) {
    @apply whitespace-pre-wrap;
  }
</style>
