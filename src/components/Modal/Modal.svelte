<script lang="ts">
	import Svg from '$components/Svg.svelte';
	import { scale } from 'svelte/transition';

	export let header: string = '';
	export let loading: boolean = false;

	let _class = '';
	export { _class as class };
</script>

<form
	class="{_class} max-w-full max-h-full p-1 w-[28rem] rounded-md overflow-hidden relative border border-neutral-600 bg-neutral-700"
	on:submit|preventDefault
>
	{#if header !== ''}
		<div class="p-1 pb-2 flex justify-center items-center text-center text-2xl border-b border-b-neutral-500 m-1 mt-0">
			{header}
			{#if loading}
				<div
					transition:scale|local
					class="absolute right-2"
				>
					<Svg
						class="w-7 h-7"
						iconClass="animate-rotate"
						src="symbols/autorenew"
					/>
				</div>
			{/if}
		</div>
	{/if}
	<div class="p-2 flex justify-center items-center text-center text-lg flex-col gap-2">
		<slot />
	</div>
</form>
