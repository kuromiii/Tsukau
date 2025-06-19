/// <reference types="vite/client" />
/// <reference path="node_modules/vue-i18n/dist/vue-i18n.d.ts" />

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}
/* eslint-enable */
