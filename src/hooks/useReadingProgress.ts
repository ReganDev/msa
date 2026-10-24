import { useEffect, type RefObject } from 'react'

/**
 * Writes how far the reader is through `ref`'s element to a `--progress`
 * custom property (0 to 1) on that element, once per frame at most. 0 is the
 * top of the element meeting the top of the viewport; 1 is its bottom meeting
 * the bottom of the viewport.
 */
export function useReadingProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const progress = travel > 0 ? -rect.top / travel : rect.top < 0 ? 1 : 0
      el.style.setProperty('--progress', String(Math.min(1, Math.max(0, progress))))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ref])
}
