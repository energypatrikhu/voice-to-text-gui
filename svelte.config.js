import adapter from "@sveltejs/adapter-static";
import { resolve } from "path";
import { sveltePreprocess } from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess(),

  kit: {
    adapter: adapter({
      fallback: "index.html",
    }),
    alias: {
      $components: resolve("./src/components"),
      $stores: resolve("./src/stores"),
      $types: resolve("./src/types"),
      $libs: resolve("./src/libs"),
      $css: resolve("./src/css"),
      $static: resolve("./static"),
    },
  },
};

export default config;
