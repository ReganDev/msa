import { Link } from 'react-router-dom'
import { PROMO } from '../lib/promo'

/**
 * The offer, stated once at the top of every page. Sits inside the fixed nav so
 * it travels with it rather than scrolling away — a dated offer is no use to
 * someone who has already read past it.
 *
 * Always rendered, and hidden by CSS unless <html> carries `has-promo`. That
 * class is set before the first paint (see index.html), so the strip is either
 * there from the very first frame or never there at all; nothing appears late
 * and nothing below it moves.
 *
 * The whole strip is the link: it is one message with one destination, and a
 * small "book now" inside a 40px band would be a worse target than the band.
 */
export default function PromoBar() {
  return (
    <div className="promo-bar">
      <Link className="promo-bar__link container" to="/booking">
        <span className="promo-bar__full">
          {PROMO.headline} single appointments, all September
        </span>
        <span className="promo-bar__short" aria-hidden="true">
          {PROMO.headline} all September
        </span>
        <span className="promo-bar__code">{PROMO.code}</span>
      </Link>
    </div>
  )
}
