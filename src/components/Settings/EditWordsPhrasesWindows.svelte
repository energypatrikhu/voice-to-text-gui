<script lang="ts">
  import Button from "$components/Modal/Button.svelte";
  import Input from "$components/Modal/Input.svelte";
  import Modal from "$components/Modal/Modal.svelte";
  import config from "$stores/config";
  import translations from "$stores/translations";
  import Textarea from "../Modal/Textarea.svelte";

  export let actionMode: "add-item" | "edit-item" | "remove-item" | "none";
  export let itemName: "customWordsAndPhrases" | "windows";
  export let indexToModify: number;

  let value =
    indexToModify !== -1 ?
      itemName === "customWordsAndPhrases" ?
        $config.speechRecognition.customWordsAndPhrases[indexToModify]
      : $config.windowAllowList.windows[indexToModify]
    : "";

  $: title =
    actionMode !== "none" ?
      itemName === "customWordsAndPhrases" ?
        (
          actionMode in
          $translations.settings.speechRecognition.customWordsAndPhrases.modal
            .titles
        ) ?
          $translations.settings.speechRecognition.customWordsAndPhrases.modal
            .titles[actionMode]
        : ""
      : (
        actionMode in
        $translations.settings.windowAllowList.windows.modal.titles
      ) ?
        $translations.settings.windowAllowList.windows.modal.titles[actionMode]
      : ""
    : "";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:click|self="{() => (actionMode = 'none')}"
  class="w-full h-[calc(100%-48px)] top-12 left-0 flex items-center justify-center fixed bg-black/25 backdrop-blur"
>
  <Modal header="{title}">
    <span
      >{itemName === "customWordsAndPhrases" ?
        $translations.settings.speechRecognition.customWordsAndPhrases.modal
          .wordPhrase
      : $translations.settings.windowAllowList.windows.modal.windowName}:</span
    >
    {#if itemName === "customWordsAndPhrases"}
      <Textarea
        placeholder="{$translations.settings.speechRecognition
          .customWordsAndPhrases.modal.wordPhrase}"
        bind:value
        disabled="{actionMode === 'remove-item'}"
        required
      />
    {:else if itemName === "windows"}
      <Input
        placeholder="{$translations.settings.windowAllowList.windows.modal
          .windowName}"
        bind:value
        disabled="{actionMode === 'remove-item'}"
        required
      />
    {/if}

    <div class="flex justify-around w-full">
      {#if actionMode !== "remove-item"}
        <Button
          type="button"
          on:click="{function () {
            if (!value) return;

            switch (actionMode) {
              case 'add-item': {
                switch (itemName) {
                  case 'customWordsAndPhrases': {
                    $config.speechRecognition.customWordsAndPhrases = [
                      ...$config.speechRecognition.customWordsAndPhrases,
                      value,
                    ];
                    break;
                  }

                  case 'windows': {
                    $config.windowAllowList.windows = [
                      ...$config.windowAllowList.windows,
                      value,
                    ];
                    break;
                  }
                }
                break;
              }

              case 'edit-item': {
                switch (itemName) {
                  case 'customWordsAndPhrases': {
                    $config.speechRecognition.customWordsAndPhrases[
                      indexToModify
                    ] = value;
                    break;
                  }

                  case 'windows': {
                    $config.windowAllowList.windows[indexToModify] = value;
                    break;
                  }
                }
                break;
              }
            }

            actionMode = 'none';
          }}"
        >
          {$translations.buttons.save}
        </Button>
      {:else}
        <Button
          type="button"
          on:click="{function () {
            switch (itemName) {
              case 'customWordsAndPhrases': {
                $config.speechRecognition.customWordsAndPhrases.splice(
                  indexToModify,
                  1,
                );
                $config.speechRecognition.customWordsAndPhrases =
                  $config.speechRecognition.customWordsAndPhrases;
                break;
              }

              case 'windows': {
                $config.windowAllowList.windows.splice(indexToModify, 1);
                $config.windowAllowList.windows =
                  $config.windowAllowList.windows;
                break;
              }
            }

            actionMode = 'none';
          }}"
        >
          {$translations.buttons.remove}
        </Button>
      {/if}

      <Button
        type="button"
        btnType="cancel"
        on:click="{() => (actionMode = 'none')}"
      >
        {$translations.buttons.cancel}
      </Button>
    </div>
  </Modal>
</div>
