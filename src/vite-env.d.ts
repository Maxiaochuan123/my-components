/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module 'my-components' {
//   import type { App, Plugin } from 'vue';
//   import type { ComponentsConfig } from '../components.config';

//   const plugin: Plugin & {
//     install: (app: App, options?: Partial<ComponentsConfig>) => void;
//   };

//   export default plugin;
// }