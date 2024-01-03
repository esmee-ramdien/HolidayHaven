import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcss from './postcss.config.js'
import tailwindcss from 'tailwindcss';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  css: {
    postcss,
  }

})
