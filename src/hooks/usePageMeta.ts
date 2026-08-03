import { useEffect } from 'react'

/**
 * Keeps <title> and the meta description in step during client-side
 * navigation. On first load these values are already baked into the HTML by
 * scripts/prerender.mjs, so this only matters once the router takes over.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = description
  }, [title, description])
}
