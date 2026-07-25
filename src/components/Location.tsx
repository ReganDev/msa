import { ADDRESS, ADDRESS_NOTE, BOOKING_URL, MAPS_EMBED_URL, MAPS_URL } from '../data'

export default function Location() {
  return (
    <section className="location section" id="location">
      <div className="container location__inner">
        <div className="location__media reveal">
          <iframe
            className="location__map"
            title="Map showing the clinic at the Tennis Centre, Avebury Rd, Orpington"
            src={MAPS_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="location__details reveal">
          <h2 className="section__title section__title--ruled">Find the clinic</h2>
          <p className="location__intro">
            I operate in the same treatment rooms as the Jon W Sports Therapy group, in a
            calm, professional space set up for assessment, treatment and rehabilitation.
          </p>

          <dl className="location__list">
            <div className="location__row">
              <dt>Address</dt>
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
              <dt>Appointments</dt>
              <dd>By booking &mdash; reserve your slot online at a time that suits you.</dd>
            </div>
          </dl>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--lg"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  )
}
