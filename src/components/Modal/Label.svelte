<script lang="ts">
	export let alignPosition: 'left' | 'center' | 'right' = 'left';
	export let textPosition: 'before' | 'after' = 'after';
	export let text = '';
	export let labelClass = '';
	export let textClass = '';

	let _alignPosition =
		alignPosition === 'left'
			? 'justify-start'
			: alignPosition === 'right'
			? 'justify-end'
			: alignPosition === 'center'
			? 'justify-center'
			: 'justify-start';
</script>

<label class="flex {_alignPosition} items-center flex-row w-full {labelClass}">
	{#if textPosition === 'before'}<span class="mr-1 {textClass}">{text}</span>{/if}
	<div>
		<slot />
	</div>
	{#if textPosition === 'after'}<span class="ml-1 {textClass}">{text}</span>{/if}
</label>
