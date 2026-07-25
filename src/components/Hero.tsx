import { BOOKING_URL } from '../data'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">Osteopath &amp; Sports Massage Therapist</p>
          <h1 className="hero__title">
            Hello, I&rsquo;m
            <br />
            <em>Matthew Knight</em>
          </h1>
          <p className="hero__credentials">M.Ost &middot; BSc (Hons) Sports and Exercise Science</p>
          <p className="hero__lead">
            Your pain shouldn&rsquo;t be the new normal. I listen, I assess, I treat and I
            advise using holistic and evidence-based care that is for you.
          </p>

          <div className="hero__actions">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--lg"
            >
              Book Now
            </a>
            <a href="#services" className="btn btn--ghost btn--lg">
              View Treatments
            </a>
          </div>

          <ul className="hero__trust">
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2l7 3v6c0 4.5-3 8.5-7 9.8C8 19.5 5 15.5 5 11V5l7-3z" />
                <path d="M9 11.5l2 2 4-4.5" />
              </svg>
              Registered Osteopath
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21s-7-4.6-9.3-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.3 12C19 16.4 12 21 12 21z" />
              </svg>
              Amateur &amp; professional athletes
            </li>
          </ul>
        </div>

        <div className="hero__media reveal">
          <div className="hero__panel">
            <img
              src="/matthew-knight.png"
              alt="Matthew Knight, Osteopath and Sports Massage Therapist"
              width={951}
              height={1024}
            />
          </div>
          <div className="hero__badge" aria-hidden="true">
            <span className="hero__badge-value">Orpington</span>
            <span className="hero__badge-label">Tennis Centre clinic</span>
          </div>
        </div>
      </div>
    </section>
  )
}
