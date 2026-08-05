import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Navigating between pages should land at the top; navigating to a home-page
 * anchor from another page (e.g. "/#contact" in the nav) should land on that
 * section. The browser only handles the second case for same-page links, so
 * both are handled here.
 *
 * `behavior` is always spelled out: html has `scroll-behavior: smooth`, which
 * a bare scrollTo/scrollIntoView inherits, and "auto" would defer right back
 * to it. Crossing pages must land instantly rather than travel the new page.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()
  const lastPathname = useRef(pathname)

  // `key` changes per history entry, so clicking the same "/#contact" twice
  // re-runs this; pathname and hash alone would compare equal and do nothing.
  useEffect(() => {
    const changedPage = lastPathname.current !== pathname
    lastPathname.current = pathname

    // The browser restores scroll position on back/forward. Don't fight it.
    if (navigationType === 'POP' && !hash) return

    // /conditions reads its #slug fragment as a selection rather than a scroll
    // target — ConditionViewer picks the condition from it, and the matching
    // article may still be `hidden` when this runs. Arriving from another page
    // must still land at the top: at narrow or short sizes the two-pane layout
    // unwinds into an ordinary scrolling page, so keeping the previous page's
    // offset would drop the reader midway down an article they never opened.
    // Switching condition while already here is ConditionViewer's to handle.
    if (pathname === '/conditions') {
      if (changedPage) window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: changedPage ? 'instant' : 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, key, navigationType])

  return null
}
