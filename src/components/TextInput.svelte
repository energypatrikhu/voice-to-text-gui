<script lang="ts">
  import Button from "$components/Modal/Button.svelte";
  import Input from "$components/Modal/Input.svelte";
  import { debugLog } from "$libs/functions/debugLog";
  import app from "$stores/app";
  import translations from "$stores/translations";

  let textInput = "";

  function submit() {
    if (!textInput) return;

    window.electron.send("electron", { event: "textInput", data: textInput });

    debugLog(textInput);
    textInput = "";
  }
</script>

{#if $app.ready && $app.mode === "production"}
  <form
    on:submit="{submit}"
    class="fixed bottom-0 w-full flex h-9 overflow-hidden"
  >
    <Input
      bind:value="{textInput}"
      autofocus="{true}"
      class="bottom-0 w-full"
      placeholder="{$translations.console.input.placeholder}"
    />
    <Button>{$translations.console.input.submit}</Button>
  </form>
{/if}
