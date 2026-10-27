import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Feature flags live in src/features.json so the build scripts can read the
// same file (scripts/fetch-posts.mjs skips Sanity when the blog is off).
const features = JSON.parse(readFileSync(new URL('./src/features.json', import.meta.url), 'utf8'))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __BLOG_ENABLED__: JSON.stringify(features.blog === true),
  },
})
