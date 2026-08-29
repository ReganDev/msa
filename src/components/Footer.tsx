import { Link } from 'react-router-dom'
import { EMAIL, INSTAGRAM_URL } from '../data'

const links = [
  { to: '/osteopathy', label: 'Osteopathy' },
  { to: '/spinal-manipulation', label: 'Spinal Manipulation' },
  { to: '/conditions', label: 'Conditions' },
  { to: '/locations/orpington', label: 'Orpington Clinic' },
  { to: '/booking', label: 'Booking' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
]

/**
 * The two marks are different shapes — the GOsC badge is landscape, the iO one
 * portrait — so they are sized to a shared height in CSS rather than a shared
 * width, which would leave the iO badge towering over the other.
 */
const badges = [
  {
    src: '/gosc-registered.jpg',
    alt: "General Osteopathic Council I'm Registered badge, registration number 12186",
  },
  {
    src: '/io-member.png',
    alt: 'The Institute of Osteopathy member badge',
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__logo">Knight Osteopathy</p>
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

        {/* Regulator and professional-body marks. Rendered from a list so the
            iO badge only needs its file dropping into /public. */}
        <ul className="footer__badges">
          {badges.map((badge) => (
            <li key={badge.src}>
              <img className="footer__badge" src={badge.src} alt={badge.alt} />
            </li>
          ))}
        </ul>

        <p className="footer__copy">
          © {new Date().getFullYear()} Knight Osteopathy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
