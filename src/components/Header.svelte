<script lang="ts">
	import Svg from '$components/Svg.svelte';
	import NavbarContainer from '$components/Navigation/NavBarContainer.svelte';
	import SideNavBar from '$components/Navigation/SideNavBar.svelte';
	import NavLeftLayout from '$components/Navigation/NavLeftLayout.svelte';
	import NavRightLayout from '$components/Navigation/NavRightLayout.svelte';
	import { offsetWidth } from '$stores/windowSizes';
	import { pageInfo } from '$stores/page';

	export let title: string | null = null;
	export let enabled = true;

	let sideBarOpen: boolean = false;
	let sideBarAvailable: boolean = false;

	$: sideBarAvailable = $offsetWidth < 768;
</script>

<svelte:head>
	<title>
		{title !== null ? title + ' - ' : $pageInfo ? $pageInfo?.title + ' - ' : ''}Voice To Text
	</title>
</svelte:head>

{#if enabled}
	<header class="select-none z-50 top-0 w-screen fixed">
		<NavbarContainer>
			<div
				slot="left"
				class="gap-1"
			>
				{#if $pageInfo?.navPos === 'side' || sideBarAvailable}
					<button
						type="button"
						on:click="{() => (sideBarOpen = !sideBarOpen)}"
					>
						<Svg
							class="w-9 h-9 flex justify-center items-center rounded-full p-0.5"
							iconClass="hover:fill-green-600 {sideBarOpen ? '!fill-green-600' : ''}"
							src="symbols/menu"
						/>
					</button>
				{:else if $offsetWidth > 0}
					<NavLeftLayout />
				{/if}
				<slot name="left" />
			</div>
			<div slot="center">
				<slot name="center" />
			</div>
			<div
				slot="right"
				class="gap-2"
			>
				<slot name="right" />
				<NavRightLayout />
			</div>
		</NavbarContainer>
		{#if ($pageInfo?.navPos === 'side' || sideBarAvailable) && sideBarOpen}
			<SideNavBar bind:open="{sideBarOpen}" />
		{/if}
	</header>
{/if}
