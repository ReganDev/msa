import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BookButton from './BookButton'
import CheckList from './CheckList'
import Chevron from './Chevron'
import {
  conditionGroups,
  conditions,
  resolveSlug,
  type Condition,
  type ConditionSection,
} from '../content/conditions'

/** Everything under a section heading, whichever way the heading is presented. */
function SectionBody({ section }: { section: ConditionSection }) {
  return (
    <div className="condition-detail__body">
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
    </div>
  )
}

/**
 * The body of one condition: copy on the left, sticky image on the right.
 *
 * Every section is a dropdown, closed until asked for. The copy is long and
 * mostly answers questions — you arrive wanting one of them, not all six — so
 * the panel opens as a list of those questions with the intro above it.
 *
 * Native <details> rather than a state-driven accordion, for three reasons: the
 * copy stays in the DOM when closed, which is what keeps all 9 conditions in the
 * prerendered HTML; keyboard and screen-reader behaviour comes for free; and it
 * works before hydration. Uncontrolled on purpose — React never touches the
 * `open` attribute, so the browser owns it and sections a reader opened survive
 * switching to another condition and back.
 */
function ConditionDetail({ condition }: { condition: Condition }) {
  return (
    <div className="condition-detail__layout">
      <div className="condition-detail__copy">
        <p className="condition-detail__intro">{condition.intro}</p>

        {condition.sections.map((section) =>
          /* Red-flag copy: open, and with no control to close it. */
          section.alwaysOpen ? (
            <section
              className="condition-detail__section condition-detail__section--urgent"
              key={section.heading}
            >
              <h3 className="condition-detail__heading">{section.heading}</h3>
              <SectionBody section={section} />
            </section>
          ) : (
            <details className="condition-detail__section" key={section.heading}>
              {/* The h3 sits inside the summary rather than replacing it: the
                  heading stays in the document outline, so the h1 → condition →
                  section structure a screen reader walks is unchanged. */}
              <summary className="condition-detail__summary">
                <h3 className="condition-detail__heading">{section.heading}</h3>
                <Chevron className="condition-detail__chevron" />
              </summary>
              <SectionBody section={section} />
            </details>
          ),
        )}
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

/**
 * Image grid shown when no condition is selected yet. This is the whole page in
 * that state — the picker rail only appears once you are reading something — so
 * it also carries the two pieces the rail's foot would otherwise hold: a way to
 * book and the note for anyone who cannot find their condition.
 */
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

      <div className="conditions-browse__foot">
        <p className="conditions-browse__aside">
          Not seeing yours? <Link to="/#contact">Get in touch</Link> — Matthew offers a
          free 15-minute call to talk it through.
        </p>
        <BookButton className="conditions-browse__book">Book an appointment</BookButton>
      </div>
    </div>
  )
}

/**
 * Two panes filling the viewport: the condition picker on the left, the active
 * condition on the right. Only the right pane scrolls, so the picker is never
 * more than a glance away and the page itself has no scrollbar.
 *
 * The rail is earned rather than given: while browsing, the grid of conditions
 * *is* the picker, and a second list of the same nine names beside it was pure
 * duplication. The rail appears on the first selection, when it stops being a
 * duplicate and starts being the way between conditions.
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
    <div className={`conditions${browsing ? ' conditions--browsing' : ''}`}>
      {!browsing && (
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
                        aria-current={
                          condition.slug === active?.slug ? 'true' : undefined
                        }
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
              Not seeing yours? <Link to="/#contact">Get in touch</Link> — Matthew
              offers a free 15-minute call to talk it through.
            </p>
          </div>
        </aside>
      )}

      <div className="conditions__pane" ref={paneRef}>
        {/* The page's h1 follows the rail: while browsing there is no rail to
            hold it, so the pane header carries it instead. Either way the page
            has exactly one h1 and it names the same thing. */}
        <div className="conditions__pane-head">
          <div className="conditions__bar">
            {browsing ? (
              <h1 className="conditions__pane-title">Common injuries &amp; conditions</h1>
            ) : (
              <h2 className="conditions__pane-title">{active!.name}</h2>
            )}
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
