<script lang="ts">
	import Modal from '$components/Modal/Modal.svelte';
	import Button from '$components/Modal/Button.svelte';
	import { config } from '$stores/config';
	import Input from '$components/Modal/Input.svelte';

	export let actionMode: 'add-item' | 'edit-item' | 'remove-item' | 'none';
	export let itemName: 'customWordsAndPhrases' | 'windows';
	export let indexOfShortcutToModify: number;

	let headerTitle = {
		'add-item': 'Add Shortcut',
		'edit-item': 'Edit Shortcut',
		'remove-item': 'Remove Shortcut',
		'none': '',
	};

	let value = indexOfShortcutToModify !== undefined ? (itemName === 'customWordsAndPhrases' ? $config.speechRecognition.customWordsAndPhrases[indexOfShortcutToModify] : $config.windowAllowList.windows[indexOfShortcutToModify]) : '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click|self="{() => (actionMode = 'none')}"
	class="w-full h-[calc(100%-48px)] top-12 left-0 flex items-center justify-center fixed bg-black/25 backdrop-blur"
>
	<Modal header="{headerTitle[actionMode]}">
		<span>Word / Phrase:</span>
		<Input
			placeholder="Custom Word / Phrase"
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
					}}">Mentés</Button
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
					}}">Törlés</Button
				>
			{/if}

			<Button
				type="button"
				btnType="cancel"
				on:click="{() => (actionMode = 'none')}"
			>
				Mégsem
			</Button>
		</div>
	</Modal>
</div>
