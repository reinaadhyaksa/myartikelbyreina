import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        id: "/",
        start_url: "/",
        scope: "/",
        name: "Chronica - Platform Membaca Artikel Modern",
        short_name: "Chronica",
        description: "Temukan artikel menarik dan informatif seputar teknologi, lifestyle, edukasi, dan banyak lagi.",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#d97706",
        icons: [
          {
            src: "web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ]
})