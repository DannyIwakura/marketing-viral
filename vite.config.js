import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' -> el build funciona en cualquier ruta (GitHub Pages por subcarpeta,
// dominio propio o dentro de un iframe) sin tocar la configuracion.
export default defineConfig({
    base: './',
    plugins: [react()],
    build: {
        outDir: 'dist',
        assetsInlineLimit: 0,
    },
    server: {
        port: 5173,
        host: '127.0.0.1',
    },
})
