<script>
  export let connectedSubSection = false;
</script>

<div class="{connectedSubSection ? 'px-3 py-1' : 'px-4 py-2'} w-[calc(75%)]">
  <div>
    <div class="text-xl">
      <slot name="title" />
    </div>
    <div class="pl-1 text-neutral-300">
      <slot name="description" />
    </div>
  </div>
  <div class="w-fit px-1">
    <slot name="content" />
  </div>
</div>
