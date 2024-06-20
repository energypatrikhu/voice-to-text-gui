<script lang="ts">
  export let value: any;
  export let selected: boolean = false;
</script>

<option
  class="text-white bg-neutral-700 py-1 px-3"
  {value}
  {selected}
>
  <slot />
</option>
