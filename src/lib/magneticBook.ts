/**
 * The Book button's hover, as script. CSS (the booking CTA section of
 * index.css) does the drawing; this only writes four custom properties on
 * whichever .btn--book the pointer is over:
 *
 *  --fx / --fy  where the pointer crossed the capsule's edge, so the deep teal
 *               fill floods out from the point you came in and drains back
 *               toward the point you left;
 *  --mx / --my  a lean toward a mouse cursor, a few pixels, run on a spring so
 *               it settles rather than snapping. The node leans further than
 *               the label (in CSS), which reads as depth.
 *
 * Delegated from the document, so it covers every booking button, including
 * the Acuity links on /booking that aren't BookButton components, and buttons
 * that mount later. Client only: main.tsx installs it, the prerender never
 * sees it. Without it the button still works and still fills, from the arrow
 * node. Touch gets the fill origin but no lean, and reduced motion gets neither
 * the lean nor (in CSS) the transition.
 */

interface Spring {
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
}

const STIFFNESS = 260
const DAMPING = 20
/** Lean at the capsule's edge, in px. */
const LEAN_X = 6
const LEAN_Y = 3.5

export function installMagneticBook() {
  if (typeof document === 'undefined') return
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const live = new Map<HTMLElement, Spring>()
  let frame = 0
  let last = 0

  const tick = (now: number) => {
    const dt = Math.min((now - last) / 1000 || 1 / 60, 1 / 30)
    last = now
    for (const [el, s] of live) {
      s.vx += (STIFFNESS * (s.tx - s.x) - DAMPING * s.vx) * dt
      s.vy += (STIFFNESS * (s.ty - s.y) - DAMPING * s.vy) * dt
      s.x += s.vx * dt
      s.y += s.vy * dt
      const resting =
        s.tx === 0 &&
        s.ty === 0 &&
        Math.abs(s.x) + Math.abs(s.y) < 0.02 &&
        Math.abs(s.vx) + Math.abs(s.vy) < 0.05
      if (resting) {
        el.style.removeProperty('--mx')
        el.style.removeProperty('--my')
        live.delete(el)
        continue
      }
      el.style.setProperty('--mx', `${s.x.toFixed(2)}px`)
      el.style.setProperty('--my', `${s.y.toFixed(2)}px`)
    }
    frame = live.size ? requestAnimationFrame(tick) : 0
  }

  const run = () => {
    if (!frame) {
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }
  }

  const spring = (el: HTMLElement) => {
    let s = live.get(el)
    if (!s) {
      s = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 }
      live.set(el, s)
    }
    return s
  }

  const buttonAt = (target: EventTarget | null) =>
    target instanceof Element ? (target.closest('.btn--book') as HTMLElement | null) : null

  const crossesEdge = (el: HTMLElement, e: PointerEvent) =>
    !(e.relatedTarget instanceof Node && el.contains(e.relatedTarget))

  const setOrigin = (el: HTMLElement, e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    el.style.setProperty('--fx', `${(e.clientX - r.left).toFixed(1)}px`)
    el.style.setProperty('--fy', `${(e.clientY - r.top).toFixed(1)}px`)
  }

  document.addEventListener(
    'pointerover',
    (e) => {
      const el = buttonAt(e.target)
      if (el && crossesEdge(el, e)) setOrigin(el, e)
    },
    { passive: true },
  )

  document.addEventListener(
    'pointermove',
    (e) => {
      const el = buttonAt(e.target)
      if (!el) return
      setOrigin(el, e)
      if (e.pointerType !== 'mouse' || motion.matches) return
      const r = el.getBoundingClientRect()
      const s = spring(el)
      s.tx = ((e.clientX - r.left) / r.width - 0.5) * 2 * LEAN_X
      s.ty = ((e.clientY - r.top) / r.height - 0.5) * 2 * LEAN_Y
      run()
    },
    { passive: true },
  )

  document.addEventListener(
    'pointerout',
    (e) => {
      const el = buttonAt(e.target)
      if (!el || !crossesEdge(el, e)) return
      setOrigin(el, e)
      const s = live.get(el)
      if (s) {
        s.tx = 0
        s.ty = 0
        run()
      }
    },
    { passive: true },
  )
}
