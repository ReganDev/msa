import { BOOKING_URL } from '../data'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">Osteopath &amp; Sports Therapist</p>
          <h1 className="hero__title">
            Move well,
            <br />
            <em>recover fully</em>
          </h1>
          <p className="hero__credentials">M.Ost &middot; BSc (Hons) Sports and Exercise Science</p>
          <p className="hero__lead">
            Evidence-based osteopathic care and therapeutic bodywork in Orpington &mdash;
            helping you understand your symptoms, recover effectively and get back to the
            activities that matter to you.
          </p>

          <div className="hero__actions">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--lg"
            >
              Book an Appointment
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
              Registered osteopath
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
              alt="Matthew Knight, osteopath and sports therapist"
              width={323}
              height={489}
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
