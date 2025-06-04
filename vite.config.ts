import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: "/ZarpadoFit/",
  css: {
    postcss: './postcss.config.cjs'  // ¡Extensión actualizada!
  }
})
