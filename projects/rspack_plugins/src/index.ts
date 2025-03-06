import type { Compiler, RspackPluginInstance } from '@rspack/core';

const PLUGIN_NAME = 'MyPlugin';

export class MyPlugin implements RspackPluginInstance {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      console.log('The Rspack build process is starting!');
    });
  }
}