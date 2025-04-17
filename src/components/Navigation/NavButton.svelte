<script lang="ts">
  import Svg from "$components/Svg.svelte";
  import type { Icon } from "$types/Mdi";

  export let title: string;
  export let active: boolean;
  export let btnClass: string = "";
  export let icon: Icon;
  export let iconPos: "before" | "after" | "both";
  export let iconClass: string = "";
  export let href: string | null = null;
  export let target: string | null = null;
  export let rel: string | null = null;
</script>

{#if href}
  <a
    {href}
    {target}
    class="hover:bg-green-600/50 h-9 flex items-center px-3 rounded-md transition-colors duration-100 {btnClass} {(
      active
    ) ?
      'bg-green-600/25'
    : ''}"
    {rel}
    on:click
  >
    {#if iconPos === "before" || iconPos === "both"}
      <Svg
        class="w-7 h-7 pr-1 {iconClass}"
        {icon}
      />
    {/if}
    <span>{title}</span>
    {#if iconPos === "after" || iconPos === "both"}
      <Svg
        class="w-7 h-7 pl-1 {iconClass}"
        {icon}
      />
    {/if}
  </a>
{:else}
  <button
    type="button"
    class="hover:bg-green-600/50 h-9 flex items-center px-3 rounded-md transition-colors duration-100 {btnClass} {(
      active
    ) ?
      'bg-green-600/25'
    : ''}"
    on:click
  >
    {#if iconPos === "before" || iconPos === "both"}
      <Svg
        class="w-7 h-7 pr-1 {iconClass}"
        {icon}
      />
    {/if}
    <span>{title}</span>
    {#if iconPos === "after" || iconPos === "both"}
      <Svg
        class="w-7 h-7 pl-1 {iconClass}"
        {icon}
      />
    {/if}
  </button>
{/if}
