<script lang="ts">
	import '../app.css';
	import Loading from '$components/Loading.svelte';

	import { onMount } from 'svelte';
	import { config, setReady } from '$stores/config';
	import { translations } from '$stores/translations';
	import { app } from '$stores/app';
	import { macros } from '$stores/macros';

	import { getLocaleTime } from '$libs/functions/getLocaleTime';
	import { preloadSvgs } from '$libs/functions/preloadSvgs';
	import { updateConsoleStore } from '$stores/console';

	window.audioPlayback = new Audio();

	window.addEventListener('mouseup', function (mouseEvent) {
		if ([1, 3, 4].includes(mouseEvent.button)) {
			mouseEvent.preventDefault();
			mouseEvent.stopPropagation();
		}
	});

	document.addEventListener('auxclick', function (mouseEvent) {
		mouseEvent.preventDefault();
		mouseEvent.stopPropagation();
	});

	let ready: boolean = false;

	window.electron.receive('electron', function ({ event, data }) {
		switch (event) {
			case 'ready': {
				ready = true;
				$app = { ...$app, ...data.versions };
				$config = data.config;
				$macros = data.macros;
				$translations = data.translations;

				setReady(true);
				break;
			}

			case 'log': {
				updateConsoleStore(data);
				window.electron.send('electron', { event: 'log', data: { ...data, filename: $app.startupDate + '.log' } });
				break;
			}

			case 'translations': {
				$translations = data.translations;
				break;
			}

			case 'config': {
				$config = data.config;
				break;
			}

			case 'selectAudioFile': {
				if (data) {
					$config.feedback.sounds.file = data;
				}
				break;
			}

			case 'playAudio': {
				if (data.src && data.volume) {
					window.audioPlayback.src = data.src;
					window.audioPlayback.volume = data.volume;
					window.audioPlayback.play();
				}
				break;
			}
		}
	});

	async function loadSettings() {
		console.log("setting 'startupDate'");
		$app.startupDate = getLocaleTime();

		console.log('preload svgs');
		await preloadSvgs();
	}

	onMount(async function () {
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
