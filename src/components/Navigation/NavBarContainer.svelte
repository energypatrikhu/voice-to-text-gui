<div
  class="flex flex-row justify-between px-3 z-50 bg-neutral-700 fixed w-screen"
>
  <div class="btn-group flex py-1.5">
    <slot name="left" />
  </div>
  <div class="btn-group flex py-1.5">
    <slot name="center" />
  </div>
  <div class="btn-group flex py-1.5">
    <slot name="right" />
  </div>
</div>

<style>
  .btn-group :global([slot]) {
    @apply flex flex-row;
  }
</style>
