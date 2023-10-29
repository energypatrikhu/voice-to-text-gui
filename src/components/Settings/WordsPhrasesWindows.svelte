<script lang="ts">
	import type { ConfigOptions } from '$types/ConfigOptions';
	import Button from '$components/Modal/Button.svelte';
	import Svg from '$components/Svg.svelte';
	import EditItem from '$components/Settings/EditItem.svelte';

	export let items: ConfigOptions['speechRecognition']['customWordsAndPhrases'] | ConfigOptions['windowAllowList']['windows'];
	export let itemName: 'customWordsAndPhrases' | 'windows';

	let actionMode: 'add-item' | 'edit-item' | 'remove-item' | 'none' = 'none';

	let indexOfShortcutToModify: number;
</script>

<div class="w-full text-white flex flex-col gap-1">
	<div class="relative flex flex-col rounded-md border border-neutral-500">
		<table>
			<thead>
				<tr>
					<th>{itemName === 'customWordsAndPhrases' ? 'Word / Phrase' : 'Window Name'}</th>
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
		<Button on:click="{() => (actionMode = 'add-item')}">Add {itemName === 'customWordsAndPhrases' ? 'Word / Phrase' : 'Window Name'}</Button>
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