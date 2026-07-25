import { EMAIL, INSTAGRAM_URL } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__logo">Matthew Knight</p>
          <p className="footer__tag">Osteopath &amp; Sports Massage Therapist &middot; Orpington</p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <a href="#about">About</a>
          <a href="#services">Treatments</a>
          <a href="#location">Location</a>
          <a href="#contact">Contact</a>
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </nav>

        <p className="footer__copy">
          © {new Date().getFullYear()} Matthew Knight Osteopathy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
