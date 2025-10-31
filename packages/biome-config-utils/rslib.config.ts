import { defineConfig } from "@rslib/core";
import { pluginPublint } from "rsbuild-plugin-publint";

export default defineConfig({
  plugins: [
    pluginPublint(),
  ],
  source: {
    entry: {
      index: "src/index.ts",
    },
  },
  lib: [
    {
      format: "esm",
      syntax: "es2021",
      dts: true,
      bundle: false,
    },
  ],
  output: {
    // copy: {
      // patterns:[
        // "./biome.json",
      // ]
    // },
  },
});
