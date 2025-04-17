<script lang="ts">
  import { page } from "$app/stores";
  import NavButton from "$components/Navigation/NavButton.svelte";
  import { webPaths } from "$libs/webPaths";
  import translations from "$stores/translations";
  import { fly } from "svelte/transition";

  export let open: boolean = false;
</script>

<div
  class="flex flex-col gap-1 fixed z-10 top-12 bg-neutral-700 h-screen w-64 p-1 border border-neutral-600 border-l-0 border-b-0"
  transition:fly|local="{{ x: -256 }}"
>
  {#each webPaths as navElement}
    <NavButton
      btnClass="justify-start"
      title="{$translations.navigation[navElement.title]}"
      href="{navElement.href}"
      rel="{navElement.external ? 'external' : ''}"
      icon="{navElement.icon ?? ''}"
      iconPos="before"
      active="{navElement.href !== '/' ?
        $page.url.pathname.startsWith(navElement.href)
      : $page.url.pathname === navElement.href}"
      on:click="{() => (open = false)}"
    />
  {/each}
</div>
