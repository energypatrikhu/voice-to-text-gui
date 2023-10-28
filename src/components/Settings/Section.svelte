<script lang="ts">
	export let useSplitterLine = true;
</script>

<div class="w-full {useSplitterLine ? 'border-b border-b-neutral-600' : ''} px-4 py-2 flex flex-col gap-2">
	<div class="text-3xl">
		<slot name="title" />
	</div>
	<slot name="content" />
</div>
