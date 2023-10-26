<script lang="ts">
	import Header from '$components/Header.svelte';
	import Layout from '$components/Layout.svelte';
	import Button from '$components/Modal/Button.svelte';
	import { dict } from '$stores/dict';
	import Console from '$components/Console.svelte';

	// let infoText = $dict.textFeedback.index.app.loading;
	// let output = '';
	// let outputPartial = '';

	// function speechRecognitionStart() {
	// 	output = '';
	// 	outputPartial = '';
	// 	window.electron.send('speech:recognition', { event: 'start', data: null });
	// }
	// function speechRecognitionStop() {
	// 	window.electron.send('speech:recognition', { event: 'stop', data: null });
	// }

	// window.electron.receive('speech:recognition', ({ event, data }) => {
	// 	console.log(event, data);

	// 	switch (event) {
	// 		case 'initialized': {
	// 			infoText = 'Recognition Engine elindítva!';
	// 			break;
	// 		}

	// 		case 'started': {
	// 			infoText = 'Hangfelismerés elindítva!';
	// 			break;
	// 		}

	// 		case 'stopped': {
	// 			infoText = 'Hangfelismerés leállítva!';
	// 			break;
	// 		}

	// 		case 'transcript': {
	// 			output = data;
	// 			break;
	// 		}
	// 	}
	// });
</script>

<Header />

<Layout>
	<!-- <div class="flex items-center flex-col text-center relative my-[3%] mx-[6%] shadow-[1px_1px_3px_black] rounded-md p-5 bg-neutral-700">
		<div class="text-4xl">
			<span>{$dict.textFeedback.index.app.loading}</span> -->

	<!-- {#if infoText === 'Alkalmazás elindítva!' || infoText === 'Hangfelismerés leállítva!'}
				<Button on:click="{speechRecognitionStart}">Speech Start</Button>
			{:else if infoText === 'Hangfelismerés elindítva!'}
				<Button on:click="{speechRecognitionStop}">Speech Stop</Button>
			{/if} -->
	<!-- </div> -->

	<!-- <div class="text-xl">
			<span>{output}</span>
		</div>

		<div class="text-sm">
			<span>{outputPartial}</span>
		</div> -->
	<!-- </div> -->

	<Console />
</Layout>
