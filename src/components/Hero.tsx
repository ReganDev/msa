const trustItems = [
  'Registered Osteopath',
  'Qualified in dry needling',
  'Qualified Sports Massage Therapist',
]

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            Osteopath &amp; Sports Massage Therapist in Orpington and Bromley
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

        <div className="hero__media reveal">
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
