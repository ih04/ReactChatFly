import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
console.log("client/vite.config.js*******************"+"__filename"+"*******************");
console.log("client/vite.config.js*******************"+"__dirname"+"*******************");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    proxy:{
      '/socket.io':{
        target: process.env.VITE_WS_URL || 'http://localhost:8000',
        ws:true
      }
    }
  },
  build: {
    outDir: '../server/public',
    emptyOutDir: true
  }
})
