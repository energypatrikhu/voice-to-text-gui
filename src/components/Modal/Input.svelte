<script lang="ts">
	type InputTypes = 'text' | 'checkbox' | 'color' | 'date' | 'datetime' | 'datetime-local' | 'email' | 'file' | 'search' | 'image' | 'number' | 'password' | 'radio';

	export let value: any = '';
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

	export let onChanged: ((value: any) => void) | undefined = undefined;

	function selectChanged(event: any) {
		if (onChanged) onChanged(JSON.parse(event.target.value ?? ''));
	}

	let _class = '';
</script>

<label class="w-full flex flex-row items-center {labelClass}">
	{#if text != '' && textPos == 'before'}<span class="w-full flex justify-start ml-1 {textClass}">
			{text}
		</span>{/if}
	{#if type == 'text'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="text"
			placeholder="{placeholder}"
			bind:value="{value}"
		/>
	{:else if type == 'checkbox'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="checkbox"
			bind:checked="{checked}"
		/>
	{:else if type == 'color'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="color"
			bind:value="{value}"
		/>
	{:else if type == 'date'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="date"
			bind:value="{value}"
		/>
	{:else if type == 'datetime'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="datetime"
			bind:value="{value}"
		/>
	{:else if type == 'datetime-local'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="datetime-local"
			bind:value="{value}"
		/>
	{:else if type == 'email'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="email"
			placeholder="{placeholder}"
			bind:value="{value}"
		/>
	{:else if type == 'file'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="file"
			bind:files="{files}"
			multiple="{multiple}"
		/>
	{:else if type == 'search'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="search"
			placeholder="{placeholder}"
			bind:value="{value}"
		/>
	{:else if type == 'image'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="image"
			bind:value="{value}"
			alt="{alt}"
			multiple="{multiple}"
		/>
	{:else if type == 'number'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="number"
			placeholder="{placeholder}"
			bind:value="{value}"
		/>
	{:else if type == 'password'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="password"
			placeholder="{placeholder}"
			bind:value="{value}"
		/>
	{:else if type == 'radio'}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="radio"
			bind:value="{value}"
		/>
	{:else}
		<input
			on:change="{selectChanged}"
			on:input
			on:focus
			class="input-cmn {_class}"
			name="{name}"
			required="{required}"
			disabled="{disabled}"
			type="text"
			placeholder="{placeholder}"
			bind:value="{value}"
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
