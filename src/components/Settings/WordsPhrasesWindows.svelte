<script lang="ts">
  import Button from "$components/Modal/Button.svelte";
  import EditItem from "$components/Settings/EditWordsPhrasesWindows.svelte";
  import Svg from "$components/Svg.svelte";
  import translations from "$stores/translations";
  import type { ConfigOptions } from "$types/ConfigOptions";

  export let items:
    | ConfigOptions["speechRecognition"]["customWordsAndPhrases"]
    | ConfigOptions["windowAllowList"]["windows"];
  export let itemName: "customWordsAndPhrases" | "windows";
  export let disabled: boolean = false;
  export let disabledText: string | undefined = undefined;

  let actionMode: "add-item" | "edit-item" | "remove-item" | "none" = "none";

  let indexToModify: number = -1;
</script>

<div class="w-full relative text-white flex flex-col gap-1">
  {#if disabled}
    <div
      class="absolute w-full h-full z-10 flex flex-col justify-center items-center text-3xl"
    >
      <span>{$translations.states.disabled}</span>
      <span class="text-xl text-neutral-300">{disabledText ?? ""}</span>
    </div>
  {/if}
  <div class="relative flex flex-col rounded-md border border-neutral-500">
    <table>
      <thead>
        <tr>
          {#if itemName === "customWordsAndPhrases"}
            <th
              >{$translations.settings.speechRecognition.customWordsAndPhrases
                .table.title}</th
            >
          {:else}
            <th>{$translations.settings.windowAllowList.windows.table.title}</th
            >
          {/if}
        </tr>
      </thead>
      <div class="absolute w-full h-[1px] left-0 bg-neutral-500"></div>
      <tbody class="small-scrollbar">
        {#each items as item, index}
          <tr>
            <td>
              <span>{item}</span>
            </td>
            <td>
              <div class="flex">
                <Button
                  class="bg-transparent hover:bg-transparent !p-0"
                  on:click="{function () {
                    indexToModify = index;
                    actionMode = 'edit-item';
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
                    actionMode = 'remove-item';
                  }}"
                >
                  <Svg
                    icon="mdiTrashCanOutline"
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
        actionMode = 'add-item';
      }}"
    >
      {#if itemName === "customWordsAndPhrases"}
        {$translations.settings.speechRecognition.customWordsAndPhrases.table
          .button}
      {:else}
        {$translations.settings.windowAllowList.windows.table.button}
      {/if}
    </Button>
  </div>
</div>

{#if actionMode !== "none"}
  <EditItem
    bind:actionMode
    bind:itemName
    bind:indexToModify
  />
{/if}

<style>
  th,
  td {
    @apply w-[calc((48rem)-48px)] text-left py-1 px-3;
  }

  td:last-child {
    @apply w-fit px-0 flex;
  }

  tbody {
    @apply h-64 block overflow-y-scroll;
  }

  thead,
  tbody tr {
    @apply table table-fixed w-[48rem];
  }

  thead {
    @apply pr-[10px] w-[calc((48rem-48px)-10px)];
  }

  table {
    @apply w-full;
  }
</style>
