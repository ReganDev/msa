const trustItems = [
  'Registered Osteopath',
  'Qualified in dry needling',
  'Qualified Sports Massage Therapist',
]

/**
 * Widescreen 50/50: the copy on a deep teal half, Matthew as a framed portrait
 * on a light half. The row runs edge to edge; the copy column lines itself up
 * with the site container in CSS.
 */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            {/* Lets a two-line eyebrow break at the place, not mid-phrase. */}
            Osteopath &amp; Sports Massage Therapist{' '}
            <span className="hero__nobreak">in Orpington and Bromley</span>
          </p>
          <h1 className="hero__title">
            Hello, I&rsquo;m
            <br />
            <em>Matthew Knight</em>
          </h1>
          <p className="hero__credentials">M.Ost &middot; BSc (Hons) Sports and Exercise Science</p>
          <p className="hero__lead">
            Your pain shouldn&rsquo;t be the new normal. I listen, I assess, I treat and I
            advise using holistic and evidence-based care that is attuned to you.
          </p>
          <p className="hero__serve">
            I help people in and around Orpington and Bromley.
          </p>

          <div className="hero__actions">
            <a href="#services" className="btn btn--primary btn--lg">
              View Treatments
            </a>
          </div>

          <ul className="hero__trust">
            {trustItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* No .reveal: the portrait has its own entrance in CSS. */}
        <div className="hero__media">
          <div className="hero__panel">
            <img
              src="/matthew-knight.png"
              alt="Matthew Knight, Osteopath and Sports Massage Therapist"
              width={950}
              height={1024}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
