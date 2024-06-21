<script lang="ts">
  import type { ConfigOptions } from '$types/ConfigOptions';
  import Button from '$components/Modal/Button.svelte';
  import Svg from '$components/Svg.svelte';
  import EditShortcut from '$components/Settings/EditShortcut.svelte';
  import { translations } from '$stores/translations';

  export let keyboardShortcuts: ConfigOptions['input']['keyboardShortcuts'];

  let actionMode: 'add-shortcut' | 'edit-shortcut' | 'remove-shortcut' | 'none' = 'none';

  let indexToModify: number = -1;
</script>

<div class="w-full text-white flex flex-col gap-1">
  <div class="relative flex flex-col rounded-md border border-neutral-500">
    <table>
      <div class="absolute w-[1px] h-full top-0 left-48 bg-neutral-500"></div>
      <thead>
        <tr>
          <th>{$translations.settings.input.keyboardShortcuts.table.prefix}</th>
          <th>{$translations.settings.input.keyboardShortcuts.table.shortcut}</th>
        </tr>
      </thead>
      <div class="absolute w-full h-[1px] left-0 bg-neutral-500"></div>
      <tbody class="small-scrollbar">
        {#each keyboardShortcuts as { outputPrefix, shortcut }, index}
          <tr>
            <td>
              {#if outputPrefix}
                <span>{outputPrefix}</span>
              {:else}
                <span class=" text-neutral-400">{$translations.states.none}</span>
              {/if}
            </td>
            <td>
              <span>{shortcut.join(' + ')}</span>
            </td>
            <td>
              <div class="flex">
                <Button
                  class="bg-transparent hover:bg-transparent !p-0"
                  on:click="{function () {
                    indexToModify = index;
                    actionMode = 'edit-shortcut';
                  }}"
                >
                  <Svg
                    icon="mdiPencil"
                    class="w-6 h-6 cursor-pointer"
                    svgClass="hover:fill-green-600"
                  />
                </Button>
                <Button
                  class="bg-transparent hover:bg-transparent !p-0"
                  on:click="{function () {
                    indexToModify = index;
                    actionMode = 'remove-shortcut';
                  }}"
                >
                  <Svg
                    icon="mdiDelete"
                    class="w-6 h-6 cursor-pointer"
                    svgClass="hover:fill-red-600"
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
        actionMode = 'add-shortcut';
      }}"
    >
      {$translations.settings.input.keyboardShortcuts.table.button}
    </Button>
  </div>
</div>

{#if actionMode !== 'none'}
  <EditShortcut
    bind:actionMode
    bind:indexToModify
  />
{/if}

<style>
  th,
  td {
    @apply text-left py-1 px-3;
  }

  th:nth-child(1),
  td:nth-child(1) {
    @apply w-48;
  }

  th:nth-child(2),
  td:nth-child(2) {
    @apply w-[calc(24rem-3rem)];
  }

  td:last-child {
    @apply w-12 px-0 flex;
  }

  tbody {
    @apply h-64 block overflow-y-scroll;
  }

  thead,
  tbody tr {
    @apply table table-fixed w-[calc(12rem+24rem)];
  }

  thead {
    @apply pr-[10px] w-[calc((12rem+(24rem-3rem))-10px)];
  }

  table {
    @apply w-full;
  }
</style>
