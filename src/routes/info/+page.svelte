<script lang="ts">
	import Header from '$components/Header.svelte';
	import Layout from '$components/Layout.svelte';
	import { dict } from '$stores/dict';
</script>

<Header />

<Layout>
	<div class="text-4xl px-4 h-16 border-b border-b-neutral-600 flex items-center">
		<span>{$dict.navigation.info}</span>
	</div>

	<div class="fixed overflow-hidden overflow-y-scroll w-full h-[calc(100%-64px-48px)] flex flex-col gap-4 px-4 py-2"> </div>
</Layout>
