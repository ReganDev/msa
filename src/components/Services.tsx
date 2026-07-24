import { BOOKING_URL, services } from '../data'

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
            Evidence-based therapeutic bodywork
          </h2>
          <p className="section__lead">
            Tailored massage interventions, grounded in anatomical expertise and current
            research, to relieve musculoskeletal pain, optimise mobility and support
            sustainable recovery &mdash; with an individualised plan for every client.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, i) => (
            <article
              className="services__card reveal"
              key={service.name}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <h3 className="services__card-title">{service.name}</h3>
              <p className="services__blurb">{service.blurb}</p>
              <div className="services__meta">
                <span className="services__price">{priceFormatter.format(service.price)}</span>
                <span className="services__price-unit">per session</span>
              </div>
            </article>
          ))}
        </div>

        <p className="section__footnote reveal">
          Not sure which treatment is right for you?{' '}
          <a href="#contact">Get in touch</a> and Matthew will help you decide, or{' '}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            book an appointment
          </a>{' '}
          online.
        </p>
      </div>
    </section>
  )
}
