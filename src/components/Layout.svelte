<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { clientWidth, clientHeight, offsetHeight, offsetWidth } from '$stores/windowSizes';
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import { fade } from 'svelte/transition';

  export let transition = true;

  let loading = true;

  onMount(() => (loading = false));

  afterNavigate(() => (loading = false));

  afterUpdate(() => {
    if (loading) {
      loading = false;
    }
  });

  onDestroy(() => (loading = true));
</script>

<main
  bind:clientHeight="{$clientHeight}"
  bind:clientWidth="{$clientWidth}"
  bind:offsetHeight="{$offsetHeight}"
  bind:offsetWidth="{$offsetWidth}"
  class="h-[calc(100%-48px)] w-screen top-12 overflow-auto fixed"
>
  {#if transition}
    {#if !loading}
      <div
        transition:fade="{{ duration: 100 }}"
        class="h-[inherit] w-[inherit] overflow-auto fixed"
      >
        <slot />
      </div>
    {/if}
  {:else}
    <slot />
  {/if}
</main>
