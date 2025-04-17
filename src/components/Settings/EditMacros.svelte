<script lang="ts">
  import Button from "$components/Modal/Button.svelte";
  import Input from "$components/Modal/Input.svelte";
  import Modal from "$components/Modal/Modal.svelte";
  import Textarea from "$components/Modal/Textarea.svelte";
  import macros from "$stores/macros";
  import translations from "$stores/translations";

  export let actionMode: "add-macro" | "edit-macro" | "remove-macro" | "none";
  export let indexToModify: number;

  let { handler, prefix, text } =
    indexToModify !== -1 ?
      $macros[indexToModify]
    : { handler: "", prefix: "", text: "" };

  $: title =
    actionMode !== "none" ?
      actionMode in $translations.settings.macros.macros.modal.titles ?
        $translations.settings.macros.macros.modal.titles[actionMode]
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
    <span>{$translations.settings.macros.macros.modal.handler}:</span>
    <Input
      placeholder="{$translations.settings.macros.macros.modal.handler}"
      bind:value="{handler}"
      disabled="{actionMode === 'remove-macro'}"
      required
    />

    <span>{$translations.settings.macros.macros.modal.prefix}:</span>
    <Input
      placeholder="{$translations.states.none}"
      bind:value="{prefix}"
      disabled="{actionMode === 'remove-macro'}"
    />

    <span>{$translations.settings.macros.macros.modal.text}:</span>
    <Textarea
      placeholder="{$translations.settings.macros.macros.modal.text}"
      bind:value="{text}"
      disabled="{actionMode === 'remove-macro'}"
      rows="{3}"
      required
    />

    <div class="flex justify-around w-full">
      {#if actionMode !== "remove-macro"}
        <Button
          type="button"
          on:click="{function () {
            if (!handler || !text) return;

            switch (actionMode) {
              case 'add-macro': {
                $macros = [...$macros, { handler, prefix, text }];
                break;
              }

              case 'edit-macro': {
                $macros[indexToModify] = { handler, prefix, text };
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
            $macros.splice(indexToModify, 1);
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
