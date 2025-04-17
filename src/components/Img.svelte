<script lang="ts">
  import Loading from "$components/Loading.svelte";

  export { _class as class };
  export let loadingStyle: string = "";
  export let loadingClass: string = "";
  export let src: any | undefined = undefined;
  export let alt: any | undefined = undefined;
  export let sizes: any | undefined = undefined;
  export let srcset: any | undefined = undefined;
  export let width: any | undefined = undefined;
  export let height: any | undefined = undefined;
  export let loading: any | null | undefined = undefined;
  export let useLoading: boolean = true;

  let _class: string = "";
  let imgLoaded = false;
</script>

{#if !imgLoaded && useLoading}
  <div class="flex {loadingClass}">
    <Loading style="{loadingStyle}" />
  </div>
{/if}
{#if useLoading}
  <img
    class="{_class} transition-opacity {imgLoaded ? 'opacity-100' : (
      'opacity-0'
    )}"
    on:load="{() => (imgLoaded = true)}"
    {loading}
    {src}
    {alt}
    {sizes}
    {srcset}
    {width}
    {height}
  />
{:else}
  <img
    class="{_class}"
    on:load
    {loading}
    {src}
    {alt}
    {sizes}
    {srcset}
    {width}
    {height}
  />
{/if}
