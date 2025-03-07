import { defineConfig } from '@rslib/core'

export default defineConfig({
  source:{
    entry:{
      index:"./src/index.ts"
    }
  },
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      dts: false,
      autoExtension:true,
      output:{
        filename:{
          js:'[name].mjs'
        }
      }
    },
    {
      format: 'cjs',
      syntax: 'es2021',
      autoExtension:true
    },
  ],
})
