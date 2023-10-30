<script lang="ts">
	import type { ConfigOptions } from '$types/ConfigOptions';
	import Button from '$components/Modal/Button.svelte';
	import Svg from '$components/Svg.svelte';
	import EditItem from '$components/Settings/EditItem.svelte';
	import { dict } from '$stores/dict';

	export let items: ConfigOptions['speechRecognition']['customWordsAndPhrases'] | ConfigOptions['windowAllowList']['windows'];
	export let itemName: 'customWordsAndPhrases' | 'windows';
	export let disabled: boolean = false;

	let actionMode: 'add-item' | 'edit-item' | 'remove-item' | 'none' = 'none';

	let indexOfShortcutToModify: number;
</script>

<div class="w-full relative text-white flex flex-col gap-1">
	{#if disabled}
		<div class="absolute w-full h-full z-10 flex justify-center items-center text-3xl">
			<span>{$dict.states.disabled}</span>
		</div>
	{/if}
	<div class="relative flex flex-col rounded-md border border-neutral-500">
		<table>
			<thead>
				<tr>
					{#if itemName === 'customWordsAndPhrases'}
						<th>{$dict.settings.speechRecognition.customWordsAndPhrases.table.title}</th>
					{:else}
						<th>{$dict.settings.windowAllowList.windows.table.title}</th>
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
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								on:click="{function () {
									indexOfShortcutToModify = index;
									actionMode = 'edit-item';
								}}"
							>
								<Svg
									src="symbols/edit"
									class="w-6 h-6 cursor-pointer"
									iconClass="hover:fill-green-600"
								/>
							</div>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								on:click="{function () {
									indexOfShortcutToModify = index;
									actionMode = 'remove-item';
								}}"
							>
								<Svg
									src="symbols/delete"
									class="w-6 h-6 cursor-pointer"
									iconClass="hover:fill-red-600"
								/>
							</div>
						</td>
					</tr>
					<div class="w-full h-[1px] left-0 bg-neutral-700"></div>
				{/each}
			</tbody>
		</table>
	</div>
	<div>
		<Button on:click="{() => (actionMode = 'add-item')}">
			{#if itemName === 'customWordsAndPhrases'}
				{$dict.settings.speechRecognition.customWordsAndPhrases.table.button}
			{:else}
				{$dict.settings.windowAllowList.windows.table.button}
			{/if}
		</Button>
	</div>
</div>

{#if actionMode !== 'none'}
	<EditItem
		bind:actionMode="{actionMode}"
		bind:itemName="{itemName}"
		bind:indexOfShortcutToModify="{indexOfShortcutToModify}"
	/>
{/if}

<style>
	th,
	td {
		@apply w-[calc((256px+384px)-48px)] text-left py-1 px-3;
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
