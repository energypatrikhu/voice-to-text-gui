<script lang="ts">
	export let name: string | undefined = undefined;
	export let cols: number | undefined = undefined;
	export let rows: number | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let value: string = '';
	export { _class as class };

	let _class = '';
</script>

<textarea
	class="{_class} text-white border rounded-md border-neutral-500 w-full py-1 px-3 flex-grow outline-none bg-transparent resize-none"
	{name}
	{cols}
	{rows}
	{placeholder}
	on:keyup
	on:keydown
	on:input
>
	{value}
</textarea>
