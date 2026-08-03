import { Link } from 'react-router-dom'
import { services } from '../data'

const priceFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

export default function Services() {
  return (
    <section className="services section section--alt" id="services">
      <div className="container">
        <div className="section__heading reveal">
          <h2 className="section__title section__title--ruled">
            Treatments with Matthew
          </h2>
          <p className="section__lead">
            Osteopathy, dry needling and sports massage &mdash; grounded in anatomical
            expertise and current research to relieve pain, restore movement and support
            recovery, with an individualised plan for every patient.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, i) => (
            <article
              className="services__card reveal"
              key={service.name}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <img
                className="services__image"
                src={service.image}
                alt={service.imageAlt}
                loading="lazy"
              />
              <div className="services__content">
                <h3 className="services__card-title">{service.name}</h3>
                <p className="services__blurb">{service.blurb}</p>

                {service.tiers ? (
                  <ul className="services__tiers">
                    {service.tiers.map((tier) => (
                      <li className="services__tier" key={tier.label}>
                        <span className="services__tier-label">{tier.label}</span>
                        <span className="services__tier-price">
                          {priceFormatter.format(tier.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="services__price-note">{service.priceNote}</p>
                )}

                {service.href && (
                  <Link className="services__more" to={service.href}>
                    More about {service.name.toLowerCase()}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h13m-5-6 6 6-6 6" />
                    </svg>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="section__footnote reveal">
          Not sure which treatment is right for you?{' '}
          <a href="#contact">Get in touch</a> and Matthew will help you decide.
        </p>
      </div>
    </section>
  )
}
