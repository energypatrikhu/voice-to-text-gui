<script lang="ts">
  import app from "$stores/app";
</script>

<div class="h-9 flex justify-center items-center overflow-hidden">
  <div class="flex flex-col">
    <span>
      <span class="font-light">App Version:</span>
      {$app.appVersion}
    </span>
    <span>
      <span class="font-light">Electron Version:</span>
      {$app.electronVersion}
    </span>
  </div>
</div>
