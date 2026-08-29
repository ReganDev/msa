import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowNode from '../components/ArrowNode'
import PromoPanel from '../components/PromoPanel'
import { PROMO, promoPrice } from '../lib/promo'
import {
  PACKAGE_DISCOUNT,
  services,
  sportsMassagePackages,
  tierLabel,
} from '../data'
import { formatPrice } from '../lib/price'

const discountLabel = `${Math.round(PACKAGE_DISCOUNT * 100)}%`

/** Every package is a block of sports massage sessions — osteopathy has none.
 *  Named once here so the row eyebrow, the panel note and the screen-reader
 *  label cannot drift apart. */
const PACKAGE_TREATMENT = 'Sports massage'

interface Row {
  key: string
  /** Small uppercase line above the name — the session length. */
  eyebrow: string
  title: string
  /** Shown next to the title on package rows only. */
  saving?: string
  price: string
  /** September price. Absent on packages, which the offer excludes. */
  promo?: string
  action: string
  bookingUrl: string
  /** Appended to the action word for screen readers, since "Book" alone
   *  repeats down the page with nothing to tell the options apart. */
  spokenLabel: string
}

interface Tab {
  id: string
  label: string
  /** The tab strip is three-up on a phone, where the full names do not fit. */
  shortLabel: string
  tag?: string
  note: string
  rows: Row[]
}

/** Appointment types are booked one at a time; packages are bought as a block. */
const bookable = services.filter((service) => service.tiers)

/**
 * Treatments with no tiers are not bookable on their own. Rather than drop them
 * silently, say how they are actually accessed, so someone looking for one does
 * not leave thinking it is unavailable.
 */
const included = services.filter((service) => !service.tiers && service.priceNote)

/** priceNote is written as a fragment ("In conjunction with..."), so it needs
 *  its capital dropped before it can sit mid-sentence. */
const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1)

const treatmentTabs: Tab[] = bookable.map((service) => ({
  id: service.name.toLowerCase().replace(/\s+/g, '-'),
  label: service.name,
  shortLabel: service.name.split(' ').at(-1) ?? service.name,
  note: 'Opens Acuity in a new tab.',
  rows: (service.tiers ?? []).map((tier) => ({
    key: tier.duration,
    eyebrow: `${service.name} · ${tier.duration}`,
    title: tier.name,
    price: formatPrice(tier.price),
    promo: formatPrice(promoPrice(tier.price)),
    action: 'Book',
    bookingUrl: tier.bookingUrl,
    spokenLabel: `${service.name}, ${tierLabel(tier)}`,
  })),
}))

/**
 * Both package groups are flattened into one list, with the session length moved
 * into each row's eyebrow. Two nested lists would put the same information in
 * two places; the point of this page is that it is all in one.
 */
const packageTab: Tab = {
  id: 'packages',
  label: 'Packages',
  shortLabel: 'Packages',
  tag: `${discountLabel} off`,
  note: `${PACKAGE_TREATMENT} packages are bought up front and booked in as you go. Sessions do not expire on a fixed date.`,
  rows: sportsMassagePackages.flatMap((group) =>
    group.options.map((option) => {
      const saving = option.sessions * group.singlePrice - option.price
      const label = `${group.duration} × ${option.sessions} sessions`
      return {
        key: `${group.duration}-${option.sessions}`,
        eyebrow: `${PACKAGE_TREATMENT} · ${group.duration}`,
        title: `${option.sessions} sessions`,
        saving: `save ${formatPrice(saving)}`,
        price: formatPrice(option.price),
        action: 'Buy',
        bookingUrl: option.bookingUrl,
        spokenLabel: `${PACKAGE_TREATMENT.toLowerCase()} package, ${label}`,
      }
    }),
  ),
}

const tabs: Tab[] = [...treatmentTabs, packageTab]

export default function Booking() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  /* Roving focus: only the selected tab is in the tab order, and the arrow keys
     move between them. Without this a keyboard user has to tab past every
     treatment to reach the list. */
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = tabs.length - 1
    let next: number | null = null

    if (event.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (event.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last

    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    /* No hero on this page, so the first section carries the top padding that
       clears the fixed nav. */
    <section className="section section--first section--alt">
      <div className="container">
        <div className="section__heading reveal">
          <h1 className="section__title">Appointments</h1>
        </div>

        <PromoPanel />

        <div className="rates reveal">
          <div className="rates__tabs" role="tablist" aria-label="Treatment type">
            {tabs.map((tab, i) => (
              <button
                type="button"
                key={tab.id}
                id={`rates-tab-${tab.id}`}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                role="tab"
                className="rates__tab"
                aria-selected={i === active}
                aria-controls={`rates-panel-${tab.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
              >
                <span className="rates__tab-full">{tab.label}</span>
                <span className="rates__tab-short" aria-hidden="true">
                  {tab.shortLabel}
                </span>
                {tab.tag && <span className="rates__tag"> · {tab.tag}</span>}
              </button>
            ))}
          </div>

          {/* Every panel stays in the document and is hidden rather than
              unmounted, so all nine prices are in the prerendered HTML and
              findable with the browser's own page search. */}
          {tabs.map((tab, i) => (
            <div
              key={tab.id}
              id={`rates-panel-${tab.id}`}
              role="tabpanel"
              className="rates__panel"
              aria-labelledby={`rates-tab-${tab.id}`}
              hidden={i !== active}
            >
              <ul className="rates__list">
                {tab.rows.map((row) => (
                  <li className="rates__row" key={row.key}>
                    <span className="rates__label">
                      <span className="rates__eyebrow">{row.eyebrow}</span>
                      <span className="rates__name">
                        {row.title}
                        {row.saving && (
                          <span className="rates__saving"> · {row.saving}</span>
                        )}
                      </span>
                    </span>
                    {/* Both figures ship in the HTML; `has-promo` on <html>
                        decides which one is displayed, so the price is right
                        in the very first frame and never swaps under the
                        reader. Packages have no row.promo and so never
                        discount. */}
                    <span className="rates__price rates__price--plain">
                      {row.price}
                    </span>
                    {row.promo && (
                      <span className="rates__price rates__price--promo">
                        <s className="rates__was">
                          <span className="visually-hidden">Was </span>
                          {row.price}
                        </s>
                        <span className="rates__now">
                          <span className="visually-hidden">, now </span>
                          {row.promo}
                        </span>
                      </span>
                    )}
                    <a
                      href={row.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--book rates__btn"
                    >
                      <span className="btn__label">
                        {row.action}
                        <span className="visually-hidden">{` ${row.spokenLabel}`}</span>
                      </span>
                      <ArrowNode />
                    </a>
                  </li>
                ))}
              </ul>

              <p className="rates__panel-note">
                {tab.note}
                {tab.id === 'packages' && (
                  <span className="promo-only">
                    {' '}
                    The {PROMO.code} offer applies to single appointments only.
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        {included.map((service) => (
          <p className="rates__note reveal" key={service.name}>
            <strong>{service.name}</strong> is used{' '}
            {lowerFirst(service.priceNote ?? '')}, not booked separately.
          </p>
        ))}

        <p className="section__footnote reveal">
          Not sure which one to book? <Link to="/#contact">Get in touch</Link> and
          Matthew will point you to the right one.
        </p>
      </div>
    </section>
  )
}
