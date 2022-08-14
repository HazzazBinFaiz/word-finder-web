import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  plugins: [react(), pathReplecer()]
})
