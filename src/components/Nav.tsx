import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BOOKING_URL, INSTAGRAM_URL } from '../data'
import { conditionGroups } from '../content/conditions'
import Chevron from './Chevron'

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Home-page sections are reached as "/#id" so the links also work from a
// sub-page; ScrollManager handles the scroll once the route has changed.
const links = [
  { to: '/', label: 'Home' },
  { to: '/osteopathy', label: 'Osteopathy' },
  { to: '/conditions', label: 'Conditions' },
  { to: '/locations/orpington', label: 'Locations' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [subOpen, setSubOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Never leave a menu hanging open across a page change. The conditions
  // dropdown also watches the hash: every entry in it points at /conditions,
  // so pathname alone does not change when you pick one from that page.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => setMenuOpen(false), [pathname, hash])

  // Reset the nested conditions list when the mobile panel closes, so it
  // reopens in its collapsed, scannable state.
  useEffect(() => {
    if (!open) setSubOpen(false)
  }, [open])

  // Escape closes the dropdown and hands focus back to the control that opened
  // it. A click or a tab-out anywhere outside closes it too.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  // Escape closes and hands focus back to the control that opened it. The panel
  // covers the page while open, so the page behind it shouldn't scroll either.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // "page" is the page itself; an ancestor of the current page is "true".
  // Hash links can't be resolved without scroll-spy, so they stay unmarked.
  const currentState = (to: string): 'page' | 'true' | undefined => {
    if (to.includes('#')) return undefined
    if (pathname === to) return 'page'
    return to !== '/' && pathname.startsWith(`${to}/`) ? 'true' : undefined
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label="Matthew Knight Osteopathy home">
          <img
            className="nav__logo"
            src="/logo.png"
            alt="Matthew Knight Osteopathy"
            width={892}
            height={1024}
            loading="eager"
          />
        </Link>

        <nav className="nav__links" aria-label="Main navigation">
          {links.map((link) =>
            link.to === '/conditions' ? (
              /* "Conditions" stays a link to the page itself; the chevron beside
                 it opens the list. Hover opens it for pointer users, focus and
                 the button for everyone else. */
              <div
                key={link.to}
                className="nav__item"
                ref={menuRef}
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    setMenuOpen(false)
                  }
                }}
              >
                <Link
                  to={link.to}
                  className="nav__link"
                  aria-current={currentState(link.to)}
                >
                  {link.label}
                </Link>
                <button
                  type="button"
                  ref={menuButtonRef}
                  className="nav__chevron-btn"
                  aria-expanded={menuOpen}
                  aria-controls="nav-conditions-menu"
                  aria-label={menuOpen ? 'Hide condition list' : 'Show condition list'}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  <Chevron className="nav__chevron" />
                </button>

                <div
                  className="nav__menu"
                  id="nav-conditions-menu"
                  hidden={!menuOpen}
                  onFocus={() => setMenuOpen(true)}
                >
                  {conditionGroups.map((group) => (
                    <div className="nav__menu-group" key={group.region}>
                      <p className="nav__menu-title">{group.region}</p>
                      {group.items.map((condition) => (
                        <Link
                          key={condition.slug}
                          to={`/conditions#${condition.slug}`}
                          className="nav__menu-link"
                          onClick={() => setMenuOpen(false)}
                        >
                          {condition.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="nav__link"
                aria-current={currentState(link.to)}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="nav__actions">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav__social"
            aria-label="Matthew Knight on Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary nav__cta"
          >
            Book Now
          </a>
          <button
            type="button"
            ref={toggleRef}
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="nav-mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Stays mounted and toggles `hidden`: unmounting it on close destroyed the
          focused link, dropping focus to <body>, and left aria-controls dangling. */}
      <nav
        className="nav__mobile"
        id="nav-mobile-menu"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map((link) => (
          <div key={link.to} className="nav__mobile-item">
            <div className="nav__mobile-row">
              <Link
                to={link.to}
                className="nav__mobile-link"
                aria-current={currentState(link.to)}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>

              {/* Collapsed by default: expanded, nine conditions plus their
                  region labels would push Locations, About and Contact off the
                  first screen of a menu that is meant to be scannable. */}
              {link.to === '/conditions' && (
                <button
                  type="button"
                  className="nav__mobile-expand"
                  aria-expanded={subOpen}
                  aria-controls="nav-mobile-conditions"
                  aria-label={
                    subOpen ? 'Hide condition list' : 'Show condition list'
                  }
                  onClick={() => setSubOpen((v) => !v)}
                >
                  <Chevron className="nav__chevron" />
                </button>
              )}
            </div>

            {link.to === '/conditions' && (
              <div className="nav__mobile-sub" id="nav-mobile-conditions" hidden={!subOpen}>
                {conditionGroups.map((group) => (
                  <div className="nav__mobile-group" key={group.region}>
                    <p className="nav__mobile-group-title">{group.region}</p>
                    {group.items.map((condition) => (
                      <Link
                        key={condition.slug}
                        to={`/conditions#${condition.slug}`}
                        className="nav__mobile-sublink"
                        onClick={() => setOpen(false)}
                      >
                        {condition.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="nav__mobile-link nav__mobile-social"
          onClick={() => setOpen(false)}
        >
          <InstagramIcon />
          Instagram
        </a>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary nav__mobile-cta"
          onClick={() => setOpen(false)}
        >
          Book Now
        </a>
      </nav>
    </header>
  )
}
