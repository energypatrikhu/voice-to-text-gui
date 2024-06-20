<script lang="ts">
  export let type: 'info' | 'error' | 'warning' = 'info';
  export { _class as class };

  let _class = '';
</script>

<span
  class="{_class} [word-break:break-word] {type === 'info'
    ? ''
    : type === 'warning'
      ? 'text-orange-500'
      : type === 'error'
        ? 'text-red-500'
        : ''}"
>
  <slot />
</span>
