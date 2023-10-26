<script lang="ts">
	import { svgs } from '$libs/functions/variables';
	import type { tSvgSrc, tSvgSrcFolder } from '$types/Svgs';

	let className: string = '';

	export let iconClass: string = '';
	export let src: tSvgSrc | `${tSvgSrcFolder}/${string}`;
	export let style: string = '';
	export { className as class };

	let getSvg = async (filepath: string) => svgs[filepath].default;
</script>

<div class="flex justify-center items-center {className}">
	{#await getSvg(src) then Svg}
		<svelte:component this={Svg} class="fill-white w-full h-full {iconClass}" {style} />
	{/await}
</div>
