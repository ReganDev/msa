import { flushSync } from 'react-dom'
import { Link, useNavigate, type LinkProps } from 'react-router-dom'

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Runs `update` inside a same-document View Transition when the browser has
 * one, so elements sharing a `view-transition-name` morph between the old and
 * new state. Without support, or with reduced motion, it just runs `update`.
 */
export function withViewTransition(update: () => void) {
  if (!document.startViewTransition || reducedMotion()) {
    update()
    return
  }
  document.startViewTransition(() => flushSync(update))
}

/**
 * A router Link whose navigation runs as a View Transition: a card's cover
 * carrying `view-transition-name: cover-<slug>` grows into the post's header
 * image carrying the same name. Modified clicks (new tab, etc.) fall through
 * to the browser untouched.
 */
export default function TransitionLink({ to, onClick, ...rest }: LinkProps) {
  const navigate = useNavigate()

  return (
    <Link
      to={to}
      {...rest}
      onClick={(event) => {
        onClick?.(event)
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return
        }
        event.preventDefault()
        withViewTransition(() => {
          navigate(to)
          // Land at the top inside the transition, so the new snapshot is taken
          // with the header image where it will actually rest.
          window.scrollTo({ top: 0, behavior: 'instant' })
        })
      }}
    />
  )
}
