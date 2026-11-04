import { useEffect, useRef } from 'react'
import { reviews, type Review } from '../content/reviews'
import { REVIEWS_URL } from '../data'

/**
 * Patient reviews as a slow, continuous drift.
 *
 * The motion itself is a CSS animation on the track, so it runs on the
 * compositor and is already moving in the prerendered HTML. The track holds the
 * list three times and slides by exactly one list's width, so the loop has no
 * seam. The two copies are aria-hidden and inert, so assistive tech reads each
 * review once.
 *
 * Script steers that same animation rather than replacing it, through its
 * playback rate and current time:
 *  - hovering or keyboard focus glides it to a stop so a review can be read,
 *    and leaving glides it back up to speed;
 *  - it can be dragged with a mouse or a finger, and a flick carries on at the
 *    flick's speed (either way) before easing back down to the cruise.
 * With reduced motion there is no animation at all: the strip becomes an
 * ordinary row you scroll yourself, and none of this runs.
 */

/** Time constant for stopping and starting, in ms. About 5x this to settle. */
const GLIDE_MS = 130
/** Time constant for a flick to bleed off back to cruising speed, in ms. */
const FLING_MS = 550
/** Fastest flick, as a multiple of cruising speed (~2,400px a second). */
const MAX_RATE = 85
/** Movement before a press counts as a drag rather than a hold, in px. */
const DRAG_SLOP = 4

function GoogleMark() {
  return (
    <svg
      className="review__source-mark"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M20.5 12.3a8.5 8.5 0 1 1-2.6-6.2" />
      <path d="M12.6 12.3h7.9" />
    </svg>
  )
}

const STAR =
  'M12 2.8l2.75 5.7 6.25.86-4.55 4.37 1.1 6.2L12 16.95l-5.55 2.98 1.1-6.2L3 9.36l6.25-.86L12 2.8z'

function Stars({ rating }: { rating: number }) {
  return (
    <span className="review__stars" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={i < rating ? 'review__star' : 'review__star review__star--off'}
          width="17"
          height="17"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={STAR} />
        </svg>
      ))}
    </span>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="review">
      <div className="review__head">
        <Stars rating={review.rating} />
        <span className="review__mark" aria-hidden="true">
          &ldquo;
        </span>
      </div>
      <blockquote className="review__quote">
        <p>{review.text}</p>
      </blockquote>
      <figcaption className="review__by">
        <span className="review__avatar" aria-hidden="true">
          {review.name.charAt(0)}
        </span>
        <span className="review__who">
          <span className="review__name">{review.name}</span>
          <span className="review__source">
            <GoogleMark />
            Google review
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

/**
 * One run of every review. The track holds three: the real list in the middle,
 * with a copy either side so there is always a card to the left of the first
 * one and to the right of the last.
 */
function ReviewGroup({ copy = false }: { copy?: boolean }) {
  return (
    <ul
      className="reviews__group"
      role="list"
      aria-hidden={copy || undefined}
      inert={copy || undefined}
    >
      {reviews.map((review, i) => (
        <li className="reviews__item" key={i}>
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  )
}

export default function Reviews() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    let rate = 1
    let target = 1
    let frame = 0
    let last = 0
    let hover = false
    let focus = false
    let drag: {
      id: number
      startX: number
      x: number
      moved: boolean
      msPerPx: number
      samples: { t: number; x: number }[]
    } | null = null

    // Looked up lazily: with reduced motion there is no animation to drive.
    const animation = () => track.getAnimations()[0] as Animation | undefined

    const step = (now: number) => {
      frame = 0
      const anim = animation()
      if (!anim || drag) return
      const dt = last ? Math.min(now - last, 64) : 16
      last = now
      const tau = Math.abs(rate) > 1.05 ? FLING_MS : GLIDE_MS
      rate += (target - rate) * (1 - Math.exp(-dt / tau))
      if (Math.abs(target - rate) < 0.004) rate = target
      anim.playbackRate = rate
      if (rate === target) last = 0
      else frame = requestAnimationFrame(step)
    }

    const settle = () => {
      target = drag || hover || focus ? 0 : 1
      if (!frame && rate !== target) {
        last = 0
        frame = requestAnimationFrame(step)
      }
    }

    const onEnter = () => {
      hover = true
      settle()
    }

    const onLeave = () => {
      hover = false
      settle()
    }

    // Only keyboard focus holds it: a mouse press focuses the strip too, and
    // that must not stop a flick.
    const onFocus = () => {
      try {
        focus = viewport.matches(':focus-visible')
      } catch {
        focus = true
      }
      settle()
    }

    const onBlur = () => {
      focus = false
      settle()
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      const anim = animation()
      const duration = Number(anim?.effect?.getComputedTiming().duration)
      const lap = track.offsetWidth / 3
      if (!anim || !duration || !lap) return

      // Keep well clear of time zero, so dragging or flicking backwards never
      // runs the animation off its start. A whole number of laps looks the same.
      const t = Number(anim.currentTime ?? 0)
      if (t < duration * 20) anim.currentTime = t + duration * 100

      cancelAnimationFrame(frame)
      frame = 0
      rate = 0
      anim.playbackRate = 0
      drag = {
        id: e.pointerId,
        startX: e.clientX,
        x: e.clientX,
        moved: false,
        msPerPx: duration / lap,
        samples: [{ t: e.timeStamp, x: e.clientX }],
      }
      viewport.setPointerCapture(e.pointerId)
    }

    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const anim = animation()
      if (!anim) return
      const dx = e.clientX - drag.x
      drag.x = e.clientX
      if (!drag.moved && Math.abs(e.clientX - drag.startX) > DRAG_SLOP) {
        drag.moved = true
        viewport.classList.add('is-dragging')
      }
      // Pointer right moves the cards right, which is time running backwards.
      anim.currentTime = Number(anim.currentTime) - dx * drag.msPerPx
      drag.samples.push({ t: e.timeStamp, x: e.clientX })
      while (drag.samples.length > 2 && e.timeStamp - drag.samples[0].t > 100) {
        drag.samples.shift()
      }
    }

    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const { samples, msPerPx, moved } = drag
      const first = samples[0]
      const latest = samples[samples.length - 1]
      const span = latest.t - first.t
      // Held still before letting go: no flick.
      const held = e.timeStamp - latest.t > 60
      const vx = span > 0 && !held ? (latest.x - first.x) / span : 0
      drag = null
      viewport.classList.remove('is-dragging')
      if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId)

      rate = Math.max(-MAX_RATE, Math.min(MAX_RATE, -vx * msPerPx))
      const anim = animation()
      if (anim) anim.playbackRate = rate
      // Having just thrown it, the pointer isn't resting there to read.
      if (moved) hover = false
      settle()
    }

    viewport.addEventListener('pointerenter', onEnter)
    viewport.addEventListener('pointerleave', onLeave)
    viewport.addEventListener('pointerdown', onDown)
    viewport.addEventListener('pointermove', onMove)
    viewport.addEventListener('pointerup', onUp)
    viewport.addEventListener('pointercancel', onUp)
    viewport.addEventListener('focus', onFocus)
    viewport.addEventListener('blur', onBlur)

    return () => {
      cancelAnimationFrame(frame)
      viewport.removeEventListener('pointerenter', onEnter)
      viewport.removeEventListener('pointerleave', onLeave)
      viewport.removeEventListener('pointerdown', onDown)
      viewport.removeEventListener('pointermove', onMove)
      viewport.removeEventListener('pointerup', onUp)
      viewport.removeEventListener('pointercancel', onUp)
      viewport.removeEventListener('focus', onFocus)
      viewport.removeEventListener('blur', onBlur)
    }
  }, [])

  return (
    <section className="reviews section" id="reviews">
      <div className="container">
        <div className="section__heading reveal">
          <h2 className="section__title" id="reviews-title">
            What patients say
          </h2>
          <a
            className="reviews__all"
            href={REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read all reviews on Google
            <span className="visually-hidden"> (opens in a new tab)</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      </div>

      <div
        className="reviews__viewport reveal"
        role="region"
        aria-labelledby="reviews-title"
        tabIndex={0}
        ref={viewportRef}
      >
        <div className="reviews__track" ref={trackRef}>
          <ReviewGroup copy />
          <ReviewGroup />
          <ReviewGroup copy />
        </div>
      </div>
    </section>
  )
}
