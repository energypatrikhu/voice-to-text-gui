<script lang="ts">
  export let useSplitterLine = true;
</script>

<div class="w-full {useSplitterLine ? 'border-b border-b-neutral-600' : ''} px-4 py-2 flex flex-col gap-4">
  <div>
    <div class="text-3xl">
      <slot name="title" />
    </div>
    <div class="pl-1 text-neutral-300">
      <slot name="description" />
    </div>
    <slot name="extra" />
  </div>
  <slot name="content" />
</div>
