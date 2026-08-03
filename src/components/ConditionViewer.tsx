import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BookButton from './BookButton'
import CheckList from './CheckList'
import {
  conditionGroups,
  conditions,
  resolveSlug,
  type Condition,
} from '../content/conditions'

/** The body of one condition: intro then prose sections. */
function ConditionDetail({ condition }: { condition: Condition }) {
  return (
    <>
      <p className="condition-detail__intro">{condition.intro}</p>

      {condition.sections.map((section) => (
        <section className="condition-detail__section" key={section.heading}>
          <h3 className="condition-detail__heading">{section.heading}</h3>

          {section.body?.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}

          {section.bullets && (
            <ul
              className={`condition-detail__list${
                section.bullets.length > 4 ? ' condition-detail__list--split' : ''
              }`}
            >
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          {section.ticks && <CheckList items={section.ticks} />}

          {section.outro?.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </section>
      ))}
    </>
  )
}

/**
 * Two panes filling the viewport: the condition picker on the left, the active
 * condition on the right. Only the right pane scrolls, so the picker is never
 * more than a glance away and the page itself has no scrollbar.
 *
 * All 9 panels render and 8 carry `hidden`, rather than rendering only the
 * active one — that keeps every condition's copy in the prerendered HTML, which
 * is the reason the separate /conditions/<slug> pages could be retired.
 */
export default function ConditionViewer() {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const paneRef = useRef<HTMLDivElement>(null)
  const userSelected = useRef(false)
  const [hydrated, setHydrated] = useState(false)

  // The server has no hash, so it always prerenders the first condition. Reading
  // the hash during the hydration render would disagree with that markup, and
  // React does not reliably patch attribute mismatches — the page could show one
  // condition while state believes another. Deferring to an effect makes the
  // first client render match the HTML, then corrects it.
  useEffect(() => setHydrated(true), [])

  // resolveSlug maps a retired slug onto its replacement; an unknown one yields
  // undefined, and findIndex then falls back to the first condition.
  const slugFromHash = hash ? resolveSlug(decodeURIComponent(hash.slice(1))) : undefined
  const indexFromHash = Math.max(
    0,
    conditions.findIndex((condition) => condition.slug === slugFromHash),
  )
  const activeIndex = hydrated ? indexFromHash : 0
  const active = conditions[activeIndex]

  const select = (slug: string) => {
    userSelected.current = true
    navigate(`/conditions#${slug}`, { replace: true })
  }

  // Send the reading pane back to the top on a switch. Focus deliberately stays
  // on the rail button: the picker is always on screen here, so moving focus
  // into the panel would cost a keyboard user their place in the list.
  // aria-current on the button carries the change instead. Guarded on real
  // interaction — the post-hydration correction above also changes activeIndex,
  // and scrolling there would fight a deep link on a fresh load.
  useEffect(() => {
    if (!userSelected.current) return
    paneRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [activeIndex])

  return (
    <div className="conditions">
      <aside className="conditions__rail">
        <div className="conditions__rail-head">
          <h1 className="conditions__title">Common injuries &amp; conditions</h1>
        </div>

        {/* Group labels are list captions, not content headings — keeping them
            out of the outline leaves h1 → condition → section intact. */}
        <nav className="conditions__nav" aria-label="Conditions">
          {conditionGroups.map((group, g) => (
            <div className="conditions__group" key={group.region}>
              <p className="conditions__group-title" id={`region-${g}`}>
                {group.region}
              </p>
              <ul className="conditions__list" aria-labelledby={`region-${g}`}>
                {group.items.map((condition) => (
                  <li key={condition.slug}>
                    <button
                      type="button"
                      className="conditions__item"
                      aria-current={condition.slug === active.slug ? 'true' : undefined}
                      onClick={() => select(condition.slug)}
                    >
                      {condition.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* The booking action lives here rather than in the pane header: the
            nav bar already carries "Book Now" top-right, and a second pill
            directly beneath it read as a duplicate. */}
        <div className="conditions__foot">
          <BookButton className="conditions__book">Book an appointment</BookButton>
          <p className="conditions__aside">
            Not seeing yours? <Link to="/#contact">Get in touch</Link> — Matthew offers
            a free 15-minute call to talk it through.
          </p>
        </div>
      </aside>

      <div className="conditions__pane" ref={paneRef}>
        <div className="conditions__pane-head">
          <div className="conditions__bar">
            <h2 className="conditions__pane-title">{active.name}</h2>
          </div>
        </div>

        <div className="conditions__pane-body">
          {conditions.map((condition, i) => (
            <article
              key={condition.slug}
              id={condition.slug}
              className="condition-detail"
              hidden={i !== activeIndex}
              aria-label={condition.name}
            >
              <ConditionDetail condition={condition} />
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
