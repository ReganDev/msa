import { Link } from 'react-router-dom'
import { EMAIL, INSTAGRAM_URL } from '../data'

const links = [
  { to: '/osteopathy', label: 'Osteopathy' },
  { to: '/spinal-manipulation', label: 'Spinal Manipulation' },
  { to: '/conditions', label: 'Conditions' },
  { to: '/locations/orpington', label: 'Orpington Clinic' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__logo">Matthew Knight</p>
          <p className="footer__tag">Osteopath &amp; Sports Massage Therapist &middot; Orpington</p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
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
