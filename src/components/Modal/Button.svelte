<script lang="ts">
  import Svg from '$components/Svg.svelte';
  import { scale } from 'svelte/transition';

  export { _class as class };
  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let btnType: 'submit' | 'cancel' = 'submit';
  export let type: 'submit' | 'button' | 'reset' | null | undefined = undefined;

  let _class = '';
</script>

<button
  on:click
  class="text-white py-1 px-2 outline-none rounded-md {btnType === 'submit'
    ? 'bg-green-600 hover:bg-green-700'
    : 'bg-red-600 hover:bg-red-700'} disabled:brightness-75 disabled:grayscale transition-all duration-100 flex justify-center items-center {_class}"
  {type}
  {disabled}
>
  <slot />
  {#if loading}
    <div transition:scale|local>
      <Svg
        class="w-7 h-7 pl-1"
        svgClass="animate-rotate"
        icon="mdiAutorenew"
      />
    </div>
  {/if}
</button>
