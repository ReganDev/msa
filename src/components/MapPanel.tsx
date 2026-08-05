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
  id?: string
  /**
   * Promotes the heading to <h1>. Set it only where this block is the page's
   * primary heading — the Orpington page, which is this block and nothing else.
   * Everywhere else the page hero owns the h1 and this stays an h2.
   */
  primary?: boolean
}

/**
 * "Visiting the clinic" block — map alongside the address, email and a booking
 * call to action. Used at the foot of the Osteopathy and condition pages, and
 * as the main location block on the Orpington page.
 */
export default function MapPanel({ heading, intro, id, primary }: Props) {
  const Heading = primary ? 'h1' : 'h2'

  return (
    <section className="section location" id={id}>
      <div className="container location__inner">
        <div className="location__media reveal">
          <ClinicMap />
        </div>

        <div className="location__details reveal">
          <Heading className="section__title section__title--ruled">{heading}</Heading>
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
