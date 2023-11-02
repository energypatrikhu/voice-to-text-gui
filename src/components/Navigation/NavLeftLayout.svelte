<script lang="ts">
	import NavButton from '$components/Navigation/NavButton.svelte';
	import { page } from '$app/stores';
	import { webPaths } from '$libs/webPaths';
	import { dict } from '$stores/dict';
</script>

{#each webPaths as navElement}
	<NavButton
		title="{$dict.navigation[navElement.title]}"
		href="{navElement.href}"
		rel="{navElement.external ? 'external' : ''}"
		icon="{navElement.icon ?? ''}"
		iconPos="before"
		active="{navElement.href !== '/' ? $page.url.pathname.startsWith(navElement.href) : $page.url.pathname === navElement.href}"
	/>
{/each}
