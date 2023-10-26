<script lang="ts">
	import { eConsole } from '$stores/console';
	import { dateToLocale } from '$libs/functions/dateToLocale';
	import { onMount } from 'svelte';
	import Highlight from 'svelte-highlight';
	import languageJson from 'svelte-highlight/languages/json';
	import 'svelte-highlight/styles/github-dark-dimmed.css';

	let consoleWrapper: HTMLDivElement;

	let eConsoleLength = $eConsole.length;
	$: if (consoleWrapper && $eConsole.length !== eConsoleLength) {
		eConsoleLength = $eConsole.length;
		consoleWrapper.scrollTo(0, consoleWrapper.scrollHeight);
	}

	onMount(function () {
		consoleWrapper.scrollTo(0, consoleWrapper.scrollHeight);
	});
</script>

<div
	bind:this="{consoleWrapper}"
	class="fixed overflow-scroll w-full h-[inherit] flex flex-col gap-4"
>
	{#each $eConsole as { type, severity, timestamp, textArray }}
		<div class="w-full border-t border-t-neutral-600">
			<div class="sticky top-0 bg-neutral-800 px-4 py-1">
				<span>[{type}]</span>
				<span>[{dateToLocale(timestamp)}]</span>
				<span>[{severity}]</span>
			</div>
			<Highlight
				class="bg-inherit"
				language="{languageJson}"
				code="{textArray.join(' ')}"
			/>
		</div>
	{/each}
</div>

<style>
	:global(code.hljs) {
		@apply bg-inherit;
	}
	:global(code.hljs *) {
		@apply whitespace-pre-wrap;
	}
</style>
