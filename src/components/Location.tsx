import { Link } from 'react-router-dom'
import { ADDRESS, ADDRESS_NOTE, MAPS_URL } from '../data'
import { ClinicMap } from './MapPanel'

export default function Location() {
  return (
    <section className="location section" id="location">
      <div className="container location__inner">
        <div className="location__media reveal">
          <ClinicMap />
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

          <Link className="btn btn--light" to="/locations/orpington">
            More about the Orpington clinic
          </Link>
        </div>
      </div>
    </section>
  )
}
