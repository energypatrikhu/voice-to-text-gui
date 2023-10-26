<script lang="ts">
	type InputTypes =
		| 'text'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'search'
		| 'image'
		| 'number'
		| 'password'
		| 'radio';

	export let value: string = '';
	export let checked: boolean = false;
	export let alt: string = '';
	export let files: FileList | null | undefined = undefined;
	export let type: InputTypes = 'text';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let placeholder: string = '';
	export let name: string | undefined = undefined;
	export let multiple: boolean = false;
	export let text: string | undefined = '';
	export let textPos: 'before' | 'after' = 'after';
	export let textClass = '';
	export let labelClass = '';
	export { _class as class };

	let _class = '';
</script>

<label class="w-full flex flex-row items-center {labelClass}">
	{#if text != '' && textPos == 'before'}<span class="w-full flex justify-start ml-1 {textClass}">
			{text}
		</span>{/if}
	{#if type == 'text'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="text"
			{placeholder}
			bind:value
		/>
	{:else if type == 'checkbox'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="checkbox"
			bind:checked
		/>
	{:else if type == 'color'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="color"
			bind:value
		/>
	{:else if type == 'date'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="date"
			bind:value
		/>
	{:else if type == 'datetime'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="datetime"
			bind:value
		/>
	{:else if type == 'datetime-local'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="datetime-local"
			bind:value
		/>
	{:else if type == 'email'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="email"
			{placeholder}
			bind:value
		/>
	{:else if type == 'file'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="file"
			bind:files
			{multiple}
		/>
	{:else if type == 'search'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="search"
			{placeholder}
			bind:value
		/>
	{:else if type == 'image'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="image"
			bind:value
			{alt}
			{multiple}
		/>
	{:else if type == 'number'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="number"
			{placeholder}
			bind:value
		/>
	{:else if type == 'password'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="password"
			{placeholder}
			bind:value
		/>
	{:else if type == 'radio'}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="radio"
			bind:value
		/>
	{:else}
		<input
			on:change
			on:input
			on:focus
			class="input-cmn {_class}"
			{name}
			{required}
			{disabled}
			type="text"
			{placeholder}
			bind:value
		/>
	{/if}
	{#if text != '' && textPos == 'after'}<span class="w-full flex justify-start ml-1 {textClass}">
			{text}
		</span>{/if}
</label>

<style>
	.input-cmn {
		@apply text-white border rounded-md border-neutral-500 py-1 px-3 flex-grow outline-none bg-transparent;
	}
</style>
