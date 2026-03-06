import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // 💥 LA MAGIE EST ICI : On force Vite à n'utiliser qu'un seul React !
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})