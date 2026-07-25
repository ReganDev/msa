import { BOOKING_URL } from '../data'

const highlights = [
  {
    title: 'Sports science foundation',
    text: 'A background in athletics and a BSc in Sports and Exercise Science underpin every assessment.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: 'Research-led practice',
    text: 'Regularly explores current research and treatment approaches to keep clinical care up to date.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    title: 'Care for everyone',
    text: 'Experience with the general public alongside amateur and professional athletes.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
        <path d="M16 5.4a3.2 3.2 0 0 1 0 5.9M17.8 14.6a6.2 6.2 0 0 1 3.4 5.4" />
      </svg>
    ),
  },
]

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container about__inner">
        <div className="about__body">
          <h2 className="section__title section__title--ruled">
            Osteopathy rooted in sport and movement
          </h2>
          <div className="about__prose">
            <p>
              From an early age, Matthew has had a strong passion for sport and the human
              body. This began with athletics, specifically sprinting. Through seeing both
              his teammates and himself experience injuries, his motivation to help others
              grew, eventually leading him to osteopathy.
            </p>
            <p>
              Osteopathy then grew into a passion that allowed Matthew to combine his
              knowledge of sport, movement and rehabilitation with a desire to help anyone.
              He remains committed to developing his clinical knowledge and regularly
              explores current research and treatment approaches to support his practice.
            </p>
            <p>
              Matthew uses this knowledge to provide unique osteopathic care and assessment,
              helping patients understand their discomfort and symptoms, recover effectively
              and get back to activities that matter to them.
            </p>
            <p>
              Alongside treating members of the general public, he has experience working
              with both amateur and professional athletes.
            </p>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--lg about__book"
          >
            Book Now
          </a>
        </div>

        <div className="about__aside">
          {highlights.map((h) => (
            <article className="about__card reveal" key={h.title}>
              <div className="about__icon">{h.icon}</div>
              <div>
                <h3 className="about__card-title">{h.title}</h3>
                <p className="about__card-text">{h.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
