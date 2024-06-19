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
      <div class="absolute w-[1px] h-full top-0 left-64 bg-neutral-500"></div>
      <thead>
        <tr>
          <th>{$translations.settings.macros.macros.modal.prefix}</th>
          <th>{$translations.settings.macros.macros.modal.text}</th>
        </tr>
      </thead>
      <div class="absolute w-full h-[1px] left-0 bg-neutral-500"></div>
      <tbody class="small-scrollbar">
        {#each macros as { handler, text }, index}
          <tr>
            <td>
              <span>{handler}</span>
            </td>
            <td>
              <span>{text}</span>
            </td>
            <td>
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
      {$translations.settings.input.keyboardShortcuts.table.button}
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
  th:first-child,
  td:first-child {
    @apply w-64;
  }
  th,
  td {
    @apply w-[calc(384px-48px)] text-left py-1 px-3;
  }

  td:last-child {
    @apply w-fit px-0 flex flex-row;
  }

  tbody {
    @apply h-64 block overflow-y-scroll;
  }

  thead,
  tbody tr {
    @apply table table-fixed w-[calc(256px+384px)];
  }

  thead {
    @apply pr-[10px] w-[calc((256px+(384px-48px))-10px)];
  }

  table {
    @apply w-full;
  }
</style>
