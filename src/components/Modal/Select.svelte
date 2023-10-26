<script lang="ts">
	export let name: string | undefined = undefined;
	export let size: number | undefined = undefined;
	export let required: boolean | undefined = undefined;
</script>

<select
	on:change
	{name}
	class="{size === undefined
		? 'py-1 px-3'
		: ''} text-white border rounded-md border-neutral-500 w-full flex-grow outline-none bg-transparent appearance-none"
	{size}
	{required}
>
	<slot />
</select>

<style>
	select {
		background-image: linear-gradient(45deg, transparent 50%, gray 50%),
			linear-gradient(135deg, gray 50%, transparent 50%);
		background-position: calc(100% - 15px) 1rem, calc(100% - 10px) 1rem;
		background-size: 5px 5px, 5px 5px;
		background-repeat: no-repeat;
	}
</style>
