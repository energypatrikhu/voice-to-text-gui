<script lang="ts">
	import Modal from '$components/Modal/Modal.svelte';
	import Button from '$components/Modal/Button.svelte';
	import { config } from '$stores/config';
	import Input from '$components/Modal/Input.svelte';
	import { dict } from '$stores/dict';

	export let actionMode: 'add-item' | 'edit-item' | 'remove-item' | 'none';
	export let itemName: 'customWordsAndPhrases' | 'windows';
	export let indexOfShortcutToModify: number;

	let value = indexOfShortcutToModify !== undefined ? (itemName === 'customWordsAndPhrases' ? $config.speechRecognition.customWordsAndPhrases[indexOfShortcutToModify] : $config.windowAllowList.windows[indexOfShortcutToModify]) : '';

	$: title = actionMode !== 'none' ? (itemName === 'customWordsAndPhrases' ? (actionMode in $dict.settings.speechRecognition.customWordsAndPhrases.modal.titles ? $dict.settings.speechRecognition.customWordsAndPhrases.modal.titles[actionMode] : '') : actionMode in $dict.settings.windowAllowList.windows.modal.titles ? $dict.settings.windowAllowList.windows.modal.titles[actionMode] : '') : '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click|self="{() => (actionMode = 'none')}"
	class="w-full h-[calc(100%-48px)] top-12 left-0 flex items-center justify-center fixed bg-black/25 backdrop-blur"
>
	<Modal header="{title}">
		<span>{itemName === 'customWordsAndPhrases' ? $dict.settings.speechRecognition.customWordsAndPhrases.modal.wordPhrase : $dict.settings.windowAllowList.windows.modal.windowName}:</span>
		<Input
			placeholder="{itemName === 'customWordsAndPhrases' ? $dict.settings.speechRecognition.customWordsAndPhrases.modal.wordPhrase : $dict.settings.windowAllowList.windows.modal.windowName}"
			bind:value="{value}"
			disabled="{actionMode === 'remove-item'}"
		/>

		<div class="flex justify-around w-full">
			{#if actionMode !== 'remove-item'}
				<Button
					type="button"
					on:click="{function () {
						switch (actionMode) {
							case 'add-item': {
								switch (itemName) {
									case 'customWordsAndPhrases': {
										$config.speechRecognition.customWordsAndPhrases.push(value);
										$config.speechRecognition.customWordsAndPhrases = $config.speechRecognition.customWordsAndPhrases;
										break;
									}

									case 'windows': {
										$config.windowAllowList.windows.push(value);
										$config.windowAllowList.windows = $config.windowAllowList.windows;
										break;
									}
								}
								break;
							}

							case 'edit-item': {
								switch (itemName) {
									case 'customWordsAndPhrases': {
										$config.speechRecognition.customWordsAndPhrases[indexOfShortcutToModify] = value;
										break;
									}

									case 'windows': {
										$config.windowAllowList.windows[indexOfShortcutToModify] = value;
										break;
									}
								}
								break;
							}
						}

						actionMode = 'none';
					}}">{$dict.buttons.save}</Button
				>
			{:else}
				<Button
					type="button"
					on:click="{function () {
						switch (itemName) {
							case 'customWordsAndPhrases': {
								$config.speechRecognition.customWordsAndPhrases.splice(indexOfShortcutToModify, 1);
								$config.speechRecognition.customWordsAndPhrases = $config.speechRecognition.customWordsAndPhrases;
								break;
							}

							case 'windows': {
								$config.windowAllowList.windows.splice(indexOfShortcutToModify, 1);
								$config.windowAllowList.windows = $config.windowAllowList.windows;
								break;
							}
						}

						actionMode = 'none';
					}}">{$dict.buttons.remove}</Button
				>
			{/if}

			<Button
				type="button"
				btnType="cancel"
				on:click="{() => (actionMode = 'none')}"
			>
				{$dict.buttons.cancel}
			</Button>
		</div>
	</Modal>
</div>
