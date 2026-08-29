import { Link } from 'react-router-dom'
import { PROMO } from '../lib/promo'

/**
 * The offer, stated once at the top of every page. Sits inside the fixed nav so
 * it travels with it rather than scrolling away — a dated offer is no use to
 * someone who has already read past it.
 *
 * Two messages ship together and CSS picks one, from the class index.html sets
 * before the first paint: the run-up names the start date, and from 1 September
 * the code itself takes the pill. Nothing appears late and nothing below it
 * moves, because the strip is either there from the very first frame or not at
 * all.
 *
 * The whole strip is the link: it is one message with one destination, and a
 * small "book now" inside a 40px band would be a worse target than the band.
 */
export default function PromoBar() {
  return (
    <div className="promo-bar">
      <Link className="promo-bar__link container" to="/booking">
        <span className="promo-bar__text promo-bar__text--soon">
          <span className="promo-bar__full">
            {PROMO.headline} single appointments — starts 1 September
          </span>
          <span className="promo-bar__short" aria-hidden="true">
            {PROMO.headline} from 1 September
          </span>
        </span>

        <span className="promo-bar__text promo-bar__text--live">
          <span className="promo-bar__full">
            {PROMO.headline} single appointments, all September
          </span>
          <span className="promo-bar__short" aria-hidden="true">
            {PROMO.headline} all September
          </span>
        </span>

        {/* The code is only worth a pill once it can actually be used. */}
        <span className="promo-bar__code">{PROMO.code}</span>
      </Link>
    </div>
  )
}
