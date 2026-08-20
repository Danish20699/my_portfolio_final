import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

import { ORIGIN } from './src/config.js'

/**
 * index.html is static, so it cannot import ORIGIN. This substitutes it into
 * the canonical link, og:url, og:image, twitter:image and the JSON-LD at
 * build time, which keeps a single source of truth for the deployed domain.
 * Runs in dev too, so `npm run dev` serves the same URLs as production.
 */
const siteOrigin = () => ({
  name: 'inject-site-origin',
  transformIndexHtml: {
    order: 'pre' as const,
    handler: (html: string) => html.replaceAll('%SITE_ORIGIN%', ORIGIN),
  },
})

export default defineConfig({
  plugins: [react(), siteOrigin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
