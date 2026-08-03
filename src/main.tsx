import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Production HTML is prerendered by scripts/prerender.mjs, so hydrate it rather
// than throwing it away. In dev the container is empty and we mount normally.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
