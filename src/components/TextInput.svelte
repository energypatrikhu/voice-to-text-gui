<script lang="ts">
	import Input from '$components/Modal/Input.svelte';
	import Button from '$components/Modal/Button.svelte';
	import { debugLog } from '$libs/functions/debugLog';
	import { translations } from '$stores/translations';
	import { app } from '../stores/app';

	let textInput = '';

	function submit() {
		if (!textInput) return;

		window.electron.send('electron', { event: 'textInput', data: textInput });

		debugLog(textInput);
		textInput = '';
	}
</script>

{#if $app.ready}
	<form
		on:submit="{submit}"
		class="fixed bottom-0 w-full flex h-9 overflow-hidden"
	>
		<Input
			bind:value="{textInput}"
			autofocus="{true}"
			class="bottom-0 w-full"
			placeholder="{$translations.console.input.placeholder}"
		/>
		<Button>{$translations.console.input.submit}</Button>
	</form>
{/if}
