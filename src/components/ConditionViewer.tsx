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

/** The body of one condition: copy on the left, sticky image on the right. */
function ConditionDetail({ condition }: { condition: Condition }) {
  return (
    <div className="condition-detail__layout">
      <div className="condition-detail__copy">
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
      </div>

      <figure className="condition-detail__figure">
        <img
          className="condition-detail__image"
          src={condition.image}
          alt={condition.imageAlt}
          width={480}
          height={480}
        />
      </figure>
    </div>
  )
}

/** Image grid shown when no condition is selected yet. */
function ConditionsBrowse({ onSelect }: { onSelect: (slug: string) => void }) {
  return (
    <div className="conditions-browse">
      <p className="conditions-browse__lead">
        Choose a condition to read about assessment, treatment and recovery with
        Matthew.
      </p>
      <ul className="conditions-browse__grid">
        {conditions.map((condition) => (
          <li key={condition.slug}>
            <button
              type="button"
              className="conditions-browse__card"
              onClick={() => onSelect(condition.slug)}
            >
              <img
                className="conditions-browse__image"
                src={condition.image}
                alt=""
                loading="lazy"
                width={320}
                height={320}
              />
              <span className="conditions-browse__name">{condition.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Two panes filling the viewport: the condition picker on the left, the active
 * condition (or image grid) on the right. Only the right pane scrolls, so the
 * picker is never more than a glance away and the page itself has no scrollbar.
 *
 * All 9 panels render and 8 carry `hidden`, rather than rendering only the
 * active one — that keeps every condition's copy in the prerendered HTML, which
 * is the reason the separate /conditions/<slug> pages could be retired.
 */
export default function ConditionViewer() {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const paneRef = useRef<HTMLDivElement>(null)
  const settled = useRef(false)
  const [hydrated, setHydrated] = useState(false)

  // The server has no hash, so it always prerenders the browse grid. Reading
  // the hash during the hydration render would disagree with that markup, and
  // React does not reliably patch attribute mismatches — the page could show one
  // condition while state believes another. Deferring to an effect makes the
  // first client render match the HTML, then corrects it.
  useEffect(() => setHydrated(true), [])

  // resolveSlug maps a retired slug onto its replacement; an unknown one yields
  // undefined and we stay on the browse grid.
  const slugFromHash = hash ? resolveSlug(decodeURIComponent(hash.slice(1))) : undefined
  const indexFromHash = slugFromHash
    ? conditions.findIndex((condition) => condition.slug === slugFromHash)
    : -1
  const activeIndex = hydrated ? indexFromHash : -1
  const browsing = activeIndex < 0
  const active = browsing ? null : conditions[activeIndex]

  const select = (slug: string) => {
    navigate(`/conditions#${slug}`, { replace: true })
  }

  const showBrowse = () => {
    navigate('/conditions', { replace: true })
  }

  // Bring the new condition into view on a switch — from the rail here, or from
  // the nav's conditions dropdown, which changes the hash without ever touching
  // this component. Focus deliberately stays put: the picker is on screen in
  // both layouts, so moving focus into the panel would cost a keyboard user
  // their place in the list. aria-current carries the change instead.
  useEffect(() => {
    if (!hydrated) return

    const arriving = !settled.current
    settled.current = true
    if (arriving && !slugFromHash) return

    const pane = paneRef.current
    if (!pane) return

    // Ask the stylesheet which layout is in force rather than repeating its
    // breakpoint here. The pane is its own scroll container only while the two
    // panes sit side by side; narrow or short, the page scrolls instead and
    // this same scrollTo would be a silent no-op.
    if (getComputedStyle(pane).overflowY === 'visible') {
      pane.scrollIntoView({ block: 'start', behavior: 'instant' })
    } else {
      pane.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [activeIndex, hydrated, slugFromHash])

  return (
    <div className="conditions">
      <aside className="conditions__rail">
        <div className="conditions__rail-head">
          <h1 className="conditions__title">Common injuries &amp; conditions</h1>
        </div>

        {/* Group labels are list captions, not content headings — keeping them
            out of the outline leaves h1 → condition → section intact. */}
        <nav className="conditions__nav" aria-label="Conditions">
          <button
            type="button"
            className="conditions__item conditions__item--browse"
            aria-current={browsing ? 'true' : undefined}
            onClick={showBrowse}
          >
            All conditions
          </button>

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
                      aria-current={condition.slug === active?.slug ? 'true' : undefined}
                      onClick={() => select(condition.slug)}
                    >
                      <img
                        className="conditions__thumb"
                        src={condition.image}
                        alt=""
                        width={48}
                        height={32}
                        loading="lazy"
                      />
                      <span>{condition.name}</span>
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
            <h2 className="conditions__pane-title">
              {browsing ? 'Browse conditions' : active!.name}
            </h2>
          </div>
        </div>

        <div className="conditions__pane-body">
          <div hidden={!browsing}>
            <ConditionsBrowse onSelect={select} />
          </div>

          {conditions.map((condition, i) => (
            <article
              key={condition.slug}
              id={condition.slug}
              className="condition-detail"
              hidden={browsing || i !== activeIndex}
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
