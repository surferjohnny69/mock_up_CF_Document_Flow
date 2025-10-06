import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/mock_up_CF_Document_Flow/' : '/',
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true
  }
}))
