import { Link } from 'react-router-dom'
import {
  PACKAGE_DISCOUNT,
  services,
  sportsMassagePackages,
  tierLabel,
} from '../data'
import { formatPrice } from '../lib/price'

const discountLabel = `${Math.round(PACKAGE_DISCOUNT * 100)}%`

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

/**
 * Both package groups are flattened into one list, with the session length moved
 * into each row's label. Two nested lists would put the same information in two
 * places; the point of this page is that it is all in one.
 */
const packageRows = sportsMassagePackages.flatMap((group) =>
  group.options.map((option) => ({
    key: `${group.duration}-${option.sessions}`,
    label: `${group.duration} × ${option.sessions} sessions`,
    saving: option.sessions * group.singlePrice - option.price,
    price: option.price,
    bookingUrl: option.bookingUrl,
  })),
)

export default function Booking() {
  return (
    /* No hero on this page, so the first section carries the top padding that
       clears the fixed nav. */
    <section className="section section--first section--alt">
      <div className="container">
        <div className="section__heading reveal">
          <h1 className="section__title">
            Appointments
          </h1>
          <p className="section__lead">
            Book a single appointment or purchase a package of sessions.
          </p>
        </div>

        <div className="rates reveal">
          {bookable.map((service) => (
            <section className="rates__group" key={service.name}>
              <h2 className="rates__group-title">{service.name}</h2>

              <ul className="rates__list">
                {service.tiers?.map((tier) => (
                  <li className="rates__row" key={tier.duration}>
                    <span className="rates__label">{tierLabel(tier)}</span>
                    <span className="rates__price">
                      {formatPrice(tier.price)}
                    </span>
                    <a
                      href={tier.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary rates__btn"
                    >
                      Book
                      <span className="visually-hidden">
                        {` ${service.name}, ${tierLabel(tier)}`}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="rates__group" id="packages">
            <h2 className="rates__group-title">
              Sports massage packages
              <span className="rates__tag">{discountLabel} off</span>
            </h2>

            <ul className="rates__list">
              {packageRows.map((row) => (
                <li className="rates__row" key={row.key}>
                  <span className="rates__label">
                    {row.label}
                    <span className="rates__saving">
                      Save {formatPrice(row.saving)}
                    </span>
                  </span>
                  <span className="rates__price">{formatPrice(row.price)}</span>
                  <a
                    href={row.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary rates__btn"
                  >
                    Buy
                    <span className="visually-hidden">
                      {` sports massage package, ${row.label}`}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {included.map((service) => (
          <p className="rates__note reveal" key={service.name}>
            <strong>{service.name}</strong> is used{' '}
            {lowerFirst(service.priceNote ?? '')}, not booked separately.
          </p>
        ))}

        <p className="section__footnote reveal">
          Packages are bought up front and booked in as you go. Sessions do not
          expire on a fixed date. Not sure which one to book?{' '}
          <Link to="/#contact">Get in touch</Link> and Matthew will point you to
          the right one.
        </p>
      </div>
    </section>
  )
}
