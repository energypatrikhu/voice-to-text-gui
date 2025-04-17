import { UserConfig } from "vite";

import { sveltekit } from "@sveltejs/kit/vite";

const isDev = process.env.NODE_ENV === "dev";

const config: UserConfig = {
  plugins: [sveltekit()],
  build: {
    minify: !isDev ? "esbuild" : false,
    chunkSizeWarningLimit: 100000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const parts = id.split("node_modules/");
            return parts[1].split("/")[0].toString();
          }
        },
      },
    },
  },
};

export default config;
