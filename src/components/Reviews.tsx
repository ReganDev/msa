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
 * Script does one thing on top: it eases the animation's playback rate instead
 * of snapping it. Hovering, touching or focusing the strip glides it to a stop
 * so a review can be read, and letting go glides it back up to speed. With
 * reduced motion there is no animation at all: the strip becomes an ordinary
 * row you scroll yourself.
 */

/** Time constant of the speed change, in ms. About 5x this to settle. */
const GLIDE_MS = 130

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

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="review">
      <span className="review__mark" aria-hidden="true">
        &ldquo;
      </span>
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
  const trackRef = useRef<HTMLDivElement>(null)
  const holds = useRef({ hover: false, focus: false })
  const glideTo = useRef<(rate: number) => void>(() => {})

  useEffect(() => {
    let rate = 1
    let target = 1
    let frame = 0
    let last = 0

    // Looked up lazily: with reduced motion there is no animation to drive.
    const animation = () => trackRef.current?.getAnimations()[0]

    const step = (now: number) => {
      const anim = animation()
      if (!anim) {
        frame = 0
        return
      }
      const dt = last ? Math.min(now - last, 64) : 16
      last = now
      rate += (target - rate) * (1 - Math.exp(-dt / GLIDE_MS))
      if (Math.abs(target - rate) < 0.004) rate = target
      anim.playbackRate = rate
      if (rate === target) {
        frame = 0
        last = 0
      } else {
        frame = requestAnimationFrame(step)
      }
    }

    glideTo.current = (next) => {
      target = next
      if (!frame && rate !== target) frame = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(frame)
      glideTo.current = () => {}
    }
  }, [])

  const sync = () => {
    const { hover, focus } = holds.current
    glideTo.current(hover || focus ? 0 : 1)
  }

  const hold = (key: 'hover' | 'focus', on: boolean) => {
    holds.current[key] = on
    sync()
  }

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
        onPointerEnter={() => hold('hover', true)}
        onPointerLeave={() => hold('hover', false)}
        onFocus={() => hold('focus', true)}
        onBlur={() => hold('focus', false)}
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
