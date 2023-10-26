<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { config } from '$stores/config';
	import { dict } from '$stores/dict';
	import { app } from '$stores/app';
	import Loading from '$components/Loading.svelte';
	import { log } from '$libs/functions/log';
	import { macros } from '$stores/macros';
	import { debugLog } from '$libs/functions/debugLog';

	let ready: boolean = false;

	window.electron.receive('speech:synthesis', ({ event }) => {
		switch (event) {
			case 'initialized': {
				window.electron.send('speech:synthesis', { event: 'speak', data: $dict.speechFeedback.index.appStarted });
				break;
			}
		}
	});

	window.electron.receive('electron', ({ event, data }) => {
		if (ready) {
			log(data);
		}

		switch (event) {
			case 'ready': {
				ready = true;
				$app = { ...$app, ...data };

				if ($config.feedback.speech.enabled) {
					window.electron.send('speech:synthesis', {
						event: 'init',
						data: $config.feedback,
					});
				}

				window.electron.send('speech:recognition', {
					event: 'init',
					data: $config.speechRecognition,
				});
				break;
			}
		}
	});

	onMount(() => {
		window.electron.send('electron', {
			event: 'ready',
			data: {
				synthesis: $config.feedback.speech.enabled,
			},
		});
	});

	$: {
		if (ready) {
			debugLog({ config: $config });
			debugLog({ dict: $dict });
			debugLog({ macros: $macros });
			debugLog({ app: $app });
		}
	}
</script>

{#if ready}
	<slot />
{:else}
	<div class="absolute flex justify-center items-center h-full w-full">
		<Loading />
	</div>
{/if}
