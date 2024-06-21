<script lang="ts">
  import Modal from '$components/Modal/Modal.svelte';
  import Button from '$components/Modal/Button.svelte';
  import Select from '$components/Modal/Select.svelte';
  import Option from '$components/Modal/Option.svelte';
  import { shortcutKeys } from '$libs/shortcutKeys';
  import config from '$stores/config';
  import Input from '$components/Modal/Input.svelte';
  import translations from '$stores/translations';

  export let actionMode: 'add-shortcut' | 'edit-shortcut' | 'remove-shortcut' | 'none';
  export let indexToModify: number;

  let buttons: Array<string> =
    indexToModify !== -1 ? $config.input.keyboardShortcuts[indexToModify].shortcut : [shortcutKeys[0]];

  let outputPrefix = indexToModify !== -1 ? $config.input.keyboardShortcuts[indexToModify].outputPrefix : '';

  $: title =
    actionMode !== 'none'
      ? actionMode in $translations.settings.input.keyboardShortcuts.modal.titles
        ? $translations.settings.input.keyboardShortcuts.modal.titles[actionMode]
        : ''
      : '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:click|self="{() => (actionMode = 'none')}"
  class="w-full h-[calc(100%-48px)] top-12 left-0 flex items-center justify-center fixed bg-black/25 backdrop-blur"
>
  <Modal header="{title}">
    {#if actionMode === 'remove-shortcut'}
      <span>{$translations.settings.input.keyboardShortcuts.modal.prefix}:</span>
      <Input
        placeholder="{$translations.states.none}"
        bind:value="{outputPrefix}"
        disabled
      />

      <span>{$translations.settings.input.keyboardShortcuts.modal.shortcut}:</span>
      <div class="flex flex-col gap-0">
        {#each buttons as button}
          <Select
            bind:value="{button}"
            disabled
          >
            {#each shortcutKeys as key}
              <Option value="{key}">{key}</Option>
            {/each}
          </Select>
        {/each}
      </div>
    {:else}
      <span>{$translations.settings.input.keyboardShortcuts.modal.prefix}:</span>
      <Input
        placeholder="{$translations.states.none}"
        bind:value="{outputPrefix}"
      />

      <span>{$translations.settings.input.keyboardShortcuts.modal.shortcut}{buttons.length > 1 ? ' (Combo)' : ''}:</span>
      <div class="flex flex-col gap-0">
        {#each buttons as button}
          <Select
            bind:value="{button}"
            required
          >
            {#each shortcutKeys as key}
              <Option value="{key}">{key}</Option>
            {/each}
          </Select>
        {/each}
      </div>

      <div class="flex gap-4">
        <Button
          type="button"
          disabled="{buttons.length > 3}"
          on:click="{function () {
            if (buttons.length < 4) buttons.length += 1;
          }}"
        >
          {$translations.settings.input.keyboardShortcuts.modal.buttons['add-button']}
        </Button>

        <Button
          type="button"
          btnType="cancel"
          disabled="{buttons.length < 2}"
          on:click="{function () {
            if (buttons.length > 1) buttons.length -= 1;
          }}"
        >
          {$translations.settings.input.keyboardShortcuts.modal.buttons['remove-button']}
        </Button>
      </div>
    {/if}

    <div class="flex justify-around w-full">
      {#if actionMode !== 'remove-shortcut'}
        <Button
          type="button"
          on:click="{function () {
            const shortcut = {
              outputPrefix: outputPrefix !== '' ? outputPrefix : null,
              shortcut: buttons,
            };

            if (actionMode === 'add-shortcut') {
              if (buttons.length > 0) {
                $config.input.keyboardShortcuts = [...$config.input.keyboardShortcuts, shortcut];
              }
            } else if (actionMode === 'edit-shortcut') {
              $config.input.keyboardShortcuts[indexToModify] = shortcut;
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
            $config.input.keyboardShortcuts.splice(indexToModify, 1);
            $config.input.keyboardShortcuts = $config.input.keyboardShortcuts;
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
