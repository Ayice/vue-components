import { fileURLToPath, URL } from 'url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ outputDir: './dist' })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      formats: ['cjs', 'es', 'iife', 'umd'],
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'ayice',
      fileName: (format) =>  `ayice.${format}.js`
    },
    rollupOptions: {
      external: ['vue']
    }
  }
})
