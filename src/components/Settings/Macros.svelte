<script lang="ts">
  import Button from '$components/Modal/Button.svelte';
  import Svg from '$components/Svg.svelte';
  import { translations } from '$stores/translations';
  import type { Macro } from '../../types/Macro';
  import EditMacros from './EditMacros.svelte';

  export let macros: Array<Macro>;

  let actionMode: 'add-macro' | 'edit-macro' | 'remove-macro' | 'none' = 'none';

  let indexToModify: number = -1;
</script>

<div class="w-full text-white flex flex-col gap-1">
  <div class="relative flex flex-col rounded-md border border-neutral-500">
    <table>
      <div class="absolute w-[1px] h-full top-0 left-48 bg-neutral-500"></div>
      <div class="absolute w-[1px] h-full top-0 left-80 bg-neutral-500"></div>
      <thead>
        <tr>
          <th>{$translations.settings.macros.macros.modal.handler}</th>
          <th>{$translations.settings.macros.macros.modal.prefix}</th>
          <th>{$translations.settings.macros.macros.modal.text}</th>
        </tr>
      </thead>
      <div class="absolute w-full h-[1px] left-0 bg-neutral-500"></div>
      <tbody class="small-scrollbar">
        {#each macros as { handler, prefix, text }, index}
          <tr>
            <td>
              <span>{handler}</span>
            </td>
            <td>
              {#if prefix}
                <span>{prefix}</span>
              {:else}
                <span class="text-neutral-400">{$translations.states.none}</span>
              {/if}
            </td>
            <td>
              <span>{text}</span>
            </td>
            <td>
              <div class="flex">
                <Button
                  class="bg-transparent hover:bg-transparent !p-0"
                  on:click="{function () {
                    indexToModify = index;
                    actionMode = 'edit-macro';
                  }}"
                >
                  <Svg
                    src="symbols/edit"
                    class="w-6 h-6 cursor-pointer"
                    iconClass="hover:fill-green-600"
                  />
                </Button>
                <Button
                  class="bg-transparent hover:bg-transparent !p-0"
                  on:click="{function () {
                    indexToModify = index;
                    actionMode = 'remove-macro';
                  }}"
                >
                  <Svg
                    src="symbols/delete"
                    class="w-6 h-6 cursor-pointer"
                    iconClass="hover:fill-red-600"
                  />
                </Button>
              </div>
            </td>
          </tr>
          <div class="w-full h-[1px] left-0 bg-neutral-700"></div>
        {/each}
      </tbody>
    </table>
  </div>
  <div>
    <Button
      on:click="{function () {
        indexToModify = -1;
        actionMode = 'add-macro';
      }}"
    >
      {$translations.settings.macros.macros.table.button}
    </Button>
  </div>
</div>

{#if actionMode !== 'none'}
  <EditMacros
    bind:actionMode
    bind:indexToModify
  />
{/if}

<style>
  th,
  td {
    @apply text-left py-1 px-3 h-full;
  }

  th:nth-child(1),
  td:nth-child(1) {
    @apply w-48;
  }

  th:nth-child(2),
  td:nth-child(2) {
    @apply w-32;
  }

  th:nth-child(3),
  td:nth-child(3) {
    @apply w-[calc(24rem-3rem)];
  }

  td:last-child {
    @apply w-12 px-0;
  }

  tbody {
    @apply h-64 block overflow-y-scroll;
  }

  thead,
  tbody tr {
    @apply table table-fixed w-[calc(12rem+8rem+24rem)];
  }

  thead {
    @apply pr-[10px] w-[calc((12rem+8rem+(24rem-3rem))-10px)];
  }

  table {
    @apply w-full;
  }
</style>
