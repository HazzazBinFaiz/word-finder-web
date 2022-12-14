import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const pathReplecer = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace(
        /(href|src)="\//g,
        '$1="'
      )
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      base: './',
      registerType: 'autoUpdate',
      includeAssets: ['icon-192x192.png', 'icon-256x256.png', 'icon-384x384.png', 'icon-512x512.png'],
      manifest: {
        name: 'Word Finder',
        short_name: 'word-finder',
        theme_color: '#334155',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-256x256.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-384x384.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'maskable_icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ]
      }
    }),
    pathReplecer(),
  ]
})