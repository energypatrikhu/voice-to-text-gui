<script lang="ts">
	import type { ConfigOptions } from '$types/ConfigOptions';
	import Button from '$components/Modal/Button.svelte';
	import Svg from '$components/Svg.svelte';
	import SetShortcut from '$components/Settings/EditShortcut.svelte';

	export let keyboardShortcuts: ConfigOptions['input']['keyboardShortcuts'];

	let actionMode: 'add-shortcut' | 'edit-shortcut' | 'remove-shortcut' | 'none' = 'none';

	let indexOfShortcutToModify: number;
</script>

<div class="w-full text-white flex flex-col gap-1">
	<div class="relative flex flex-col rounded-md border border-neutral-500">
		<table>
			<div class="absolute w-[1px] h-full top-0 left-64 bg-neutral-500"></div>
			<thead>
				<tr>
					<th>Output Preffix</th>
					<th>Shortcut</th>
				</tr>
			</thead>
			<div class="absolute w-full h-[1px] left-0 bg-neutral-500"></div>
			<tbody class="small-scrollbar">
				{#each keyboardShortcuts as { outputPrefix, shortcut }, index}
					<tr>
						<td>
							{#if outputPrefix}
								<span class="">{outputPrefix}</span>
							{:else}
								<span class=" text-neutral-400">none</span>
							{/if}
						</td>
						<td>
							<span>{shortcut.join(' + ')}</span>
						</td>
						<td>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								on:click="{function () {
									indexOfShortcutToModify = index;
									actionMode = 'edit-shortcut';
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
									actionMode = 'remove-shortcut';
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
		<Button on:click="{() => (actionMode = 'add-shortcut')}">Add Shortcut</Button>
	</div>
</div>

{#if actionMode !== 'none'}
	<SetShortcut
		bind:actionMode="{actionMode}"
		bind:indexOfShortcutToModify="{indexOfShortcutToModify}"
	/>
{/if}

<style>
	th:first-child,
	td:first-child {
		@apply w-64;
	}
	th,
	td {
		@apply w-[calc(384px-48px)] text-left py-1 px-3;
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