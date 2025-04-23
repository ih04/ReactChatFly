import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    proxy:{
      '/socket.io':{
        target: process.env.VITE_WS_URL || 'http://localhost:4000',
        ws:true
      }
    }
  },
  build: {
    outDir: '../server/public',
    emptyOutDir: true
  }
})
