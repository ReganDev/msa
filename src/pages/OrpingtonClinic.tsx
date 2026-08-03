import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import BookButton from '../components/BookButton'
import ConditionGrid from '../components/ConditionGrid'
import MapPanel from '../components/MapPanel'
import { services } from '../data'

export default function OrpingtonClinic() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Osteopathy & Sports Injury Clinic in Orpington"
        lead={[
          'Matthew Knight treats from the Tennis Centre on Avebury Road, inside the Jon W Sports injury clinic.',
        ]}
      >
        <BookButton />
      </PageHero>

      <section className="section section--alt">
        <div className="container">
          <div className="section__heading reveal">
            <h2 className="section__title section__title--ruled">
              What I offer in the Orpington Osteopathy Clinic
            </h2>
          </div>

          <div className="offer">
            {services.map((service, i) => (
              <article
                className="offer__card reveal"
                key={service.name}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3 className="offer__title">{service.name}</h3>
                <p className="offer__text">{service.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MapPanel
        heading="Visiting the Osteopath Clinic in Orpington — Clinic Address and Location"
        intro="Free parking is available at the Tennis Centre."
      />

      <section className="section section--alt">
        <div className="container">
          <div className="section__heading reveal">
            <h2 className="section__title section__title--ruled">Other conditions</h2>
          </div>

          <div className="reveal">
            <ConditionGrid />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__heading reveal">
            <h2 className="section__title section__title--ruled">
              Osteopathy services at the Orpington Clinic
            </h2>
          </div>

          {/* Reuses the .condition-grid link cards — treatments without a page of
              their own point at the home-page services section for full detail. */}
          <ul className="condition-grid reveal">
            {services.map((service) => (
              <li key={service.name}>
                <Link
                  className="condition-grid__link"
                  to={service.href ?? '/#services'}
                >
                  <span className="condition-grid__name">{service.name}</span>
                  <svg
                    className="condition-grid__arrow"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h13m-5-6 6 6-6 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          <p className="section__footnote reveal">
            Not sure which treatment is right for you?{' '}
            <Link to="/#contact">Get in touch</Link> and Matthew will help you decide.
          </p>
        </div>
      </section>
    </>
  )
}
