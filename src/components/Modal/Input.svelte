<script lang="ts">
  type InputTypes =
    | "text"
    | "checkbox"
    | "color"
    | "date"
    | "datetime"
    | "datetime-local"
    | "email"
    | "file"
    | "search"
    | "image"
    | "number"
    | "password"
    | "radio";

  export let value: any = "";
  export let checked: boolean = false;
  export let alt: string = "";
  export let files: FileList | null | undefined = undefined;
  export let type: InputTypes = "text";
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let placeholder: string = "";
  export let name: string | undefined = undefined;
  export let multiple: boolean = false;
  export let text: string | undefined = "";
  export let textPos: "before" | "after" = "after";
  export let textClass = "";
  export let labelClass = "";
  export let autofocus: boolean = false;
  export { _class as class };

  export let onChanged: ((value: any) => void) | undefined = undefined;

  function selectChanged(event: any) {
    if (onChanged) onChanged(JSON.parse(event.target.value ?? ""));
  }

  let _class = "";
</script>

<label class="w-full flex flex-row items-center {labelClass}">
  {#if text !== "" && textPos === "before"}<span
      class="w-full flex justify-start ml-1 {textClass}"
    >
      {text}
    </span>{/if}
  {#if type === "text"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="text"
      {placeholder}
      bind:value
    />
  {:else if type === "checkbox"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="checkbox"
      bind:checked
    />
  {:else if type === "color"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="color"
      bind:value
    />
  {:else if type === "date"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="date"
      bind:value
    />
  {:else if type === "datetime"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="datetime"
      bind:value
    />
  {:else if type === "datetime-local"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="datetime-local"
      bind:value
    />
  {:else if type === "email"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="email"
      {placeholder}
      bind:value
    />
  {:else if type === "file"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="file"
      bind:files
      {multiple}
      bind:value
    />
  {:else if type === "search"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="search"
      {placeholder}
      bind:value
    />
  {:else if type === "image"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="image"
      bind:value
      {alt}
      {multiple}
    />
  {:else if type === "number"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="number"
      {placeholder}
      bind:value
    />
  {:else if type === "password"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="password"
      {placeholder}
      bind:value
    />
  {:else if type === "radio"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="radio"
      bind:value
    />
  {:else}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      on:change="{selectChanged}"
      on:input
      on:focus
      class="input-cmn {disabled ? 'input-cmn-disabled' : ''} {_class}"
      {name}
      {required}
      {disabled}
      {autofocus}
      type="text"
      {placeholder}
      bind:value
    />
  {/if}
  {#if text !== "" && textPos === "after"}
    <span class="w-full flex justify-start ml-1 {textClass}">
      {text}
    </span>
  {/if}
</label>

<style>
  .input-cmn {
    @apply text-white border rounded-md border-neutral-500 py-1 px-3 flex-grow outline-none bg-transparent;
  }

  .input-cmn-disabled {
    @apply text-neutral-400;
  }
</style>
