import { ADDRESS, ADDRESS_NOTE, EMAIL, MAPS_EMBED_URL, MAPS_URL } from '../data'
import BookButton from './BookButton'

/**
 * The embedded clinic map on its own. Shared by the home-page Location section
 * and by <MapPanel> below so the embed URL and framing live in one place.
 */
export function ClinicMap() {
  return (
    <iframe
      className="location__map"
      title="Map showing the clinic at the Tennis Centre, Avebury Rd, Orpington"
      src={MAPS_EMBED_URL}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}

interface Props {
  heading: string
  intro?: string
  /** Rendered as <h1> only where this block is the page's primary heading. */
  id?: string
}

/**
 * "Visiting the clinic" block — map alongside the address, email and a booking
 * call to action. Used at the foot of the Osteopathy and condition pages, and
 * as the main location block on the Orpington page.
 */
export default function MapPanel({ heading, intro, id }: Props) {
  return (
    <section className="section location" id={id}>
      <div className="container location__inner">
        <div className="location__media reveal">
          <ClinicMap />
        </div>

        <div className="location__details reveal">
          <h2 className="section__title section__title--ruled">{heading}</h2>
          {intro && <p className="location__intro">{intro}</p>}

          <dl className="location__list">
            <div className="location__row">
              <dt>Clinic address</dt>
              <dd>
                {ADDRESS}
                <br />
                {ADDRESS_NOTE}
                <br />
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </dd>
            </div>
            <div className="location__row">
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </dd>
            </div>
          </dl>

          <BookButton />
        </div>
      </div>
    </section>
  )
}
