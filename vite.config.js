import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: true,
    port: 5173,
    proxy: {
      // Local OpenAI proxy (functions/local-server.js) — key stays server-side
      "/api/voice-profile": {
        target: "http://localhost:8787",
        changeOrigin: true
      },
      "/api/voice-tts": {
        target: "http://localhost:8787",
        changeOrigin: true
      }
    }
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],
})
