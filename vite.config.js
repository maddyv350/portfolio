import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Absolute site URL for the Open Graph tags in index.html. Set VITE_SITE_URL yourself, or let the host provide it:
// Vercel exposes the production domain, Netlify the site URL. Locally it falls back to the value in .env.
if (!process.env.VITE_SITE_URL) {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) process.env.VITE_SITE_URL = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/`
  else if (process.env.NETLIFY && process.env.URL) process.env.VITE_SITE_URL = `${process.env.URL}/`
}

export default defineConfig({
  // GitHub Pages serves the site from /<repo>/, so CI passes BASE_PATH. Vercel and Netlify serve from /.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})
