<script lang="ts">
	import Modal from '$components/Modal/Modal.svelte';
	import Button from '$components/Modal/Button.svelte';
	import Select from '$components/Modal/Select.svelte';
	import Option from '$components/Modal/Option.svelte';
	import { shortcutKeys } from '$libs/shortcutKeys';
	import { config } from '$stores/config';
	import Input from '$components/Modal/Input.svelte';

	export let actionMode: 'add-shortcut' | 'edit-shortcut' | 'remove-shortcut' | 'none';
	export let indexOfShortcutToModify: number;

	let headerTitle = {
		'add-shortcut': 'Add Shortcut',
		'edit-shortcut': 'Edit Shortcut',
		'remove-shortcut': 'Remove Shortcut',
		'none': '',
	};

	let buttons: Array<string> = [];
	buttons.length += 1;
	let outputPrefix = indexOfShortcutToModify ? $config.input.keyboardShortcuts[indexOfShortcutToModify].outputPrefix : '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click|self="{() => (actionMode = 'none')}"
	class="w-full h-[calc(100%-48px)] top-12 left-0 flex items-center justify-center fixed bg-black/25 backdrop-blur"
>
	<Modal header="{headerTitle[actionMode]}">
		{#if actionMode === 'remove-shortcut'}
			<span>Prefix:</span>
			<Input
				value="{$config.input.keyboardShortcuts[indexOfShortcutToModify].outputPrefix}"
				disabled
			/>

			<span>Shortcut:</span>
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
			<span>Prefix:</span>
			<Input bind:value="{outputPrefix}" />

			<span>Shortcut:</span>
			<div class="flex flex-col gap-0">
				{#each buttons as button}
					<Select bind:value="{button}">
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
					}}">Add Button</Button
				>

				<Button
					type="button"
					btnType="cancel"
					disabled="{buttons.length < 2}"
					on:click="{function () {
						if (buttons.length > 1) buttons.length -= 1;
					}}">Remove Button</Button
				>
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
								$config.input.keyboardShortcuts.push(shortcut);
								$config.input.keyboardShortcuts = $config.input.keyboardShortcuts;
							}
						} else if (actionMode === 'edit-shortcut') {
							$config.input.keyboardShortcuts[indexOfShortcutToModify] = shortcut;
						}

						actionMode = 'none';
					}}">Mentés</Button
				>
			{:else}
				<Button
					type="button"
					on:click="{function () {
						$config.input.keyboardShortcuts.splice(indexOfShortcutToModify, 1);
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
