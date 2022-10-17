import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue2";

// @ts-ignore
import vueTemplateBabelCompiler from "vue-template-babel-compiler";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/vue-vanilla-ladda", import.meta.url)),
      "~bootstrap": "bootstrap",
      "~ladda": "ladda",
    },
  },
});
