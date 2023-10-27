<script lang="ts">
	import '../app.css';
	import Loading from '$components/Loading.svelte';

	import { onMount } from 'svelte';
	import { config } from '$stores/config';
	import { dict } from '$stores/dict';
	import { app } from '$stores/app';
	import { macros } from '$stores/macros';

	import { getLocaleTime } from '$libs/functions/getLocaleTime';
	import { preloadSvgs } from '$libs/functions/preloadSvgs';
	import { updateConsoleStore } from '../stores/console';

	let ready: boolean = false;

	window.electron.receive('electron', ({ event, data }) => {
		switch (event) {
			case 'ready': {
				ready = true;
				$app = { ...$app, ...data.versions };
				$config = data.config;
				$macros = data.macros;
				$dict = data.dictionary;
				break;
			}
			case 'log': {
				updateConsoleStore(data);
				break;
			}
		}
	});

	async function loadSettings() {
		console.log(`setting 'startupDate'`);
		$app.startupDate = getLocaleTime();

		console.log(`preload svgs`);
		await preloadSvgs();
	}

	onMount(async () => {
		await loadSettings();

		window.electron.send('electron', {
			event: 'ready',
			data: null,
		});
	});
</script>

{#if ready}
	<slot />
{:else}
	<div class="absolute flex justify-center items-center h-full w-full">
		<Loading />
	</div>
{/if}