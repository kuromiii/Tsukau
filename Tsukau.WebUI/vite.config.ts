import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue(), vueDevTools(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_TARGET_URL,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'webapp',
      emptyOutDir: true,
      sourcemap: env.VITE_BUILD_SOURCEMAPS === 'true',
    },
    css: {
      devSourcemap: env.VITE_BUILD_SOURCEMAPS === 'true',
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
