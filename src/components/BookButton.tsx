import { Link } from 'react-router-dom'
import { BOOKING_PATH } from '../data'
import ArrowNode from './ArrowNode'

interface Props {
  /** Button label. Defaults to the wording the client uses across the new pages. */
  children?: React.ReactNode
  /** Extra modifier classes, e.g. 'btn--lg' */
  className?: string
  /** Fires alongside the navigation — the mobile drawer uses it to close itself. */
  onClick?: () => void
}

/**
 * The booking call-to-action. Acuity gives every appointment type and package
 * its own deep link, so there is no single URL to send people to — this points
 * at /booking, which lists the prices and hands off to the right Acuity link.
 *
 * This is the only action on the site that gets the split-capsule treatment
 * (label, then an inset arrow node): booking is the conversion, and it should
 * not look like the form submit or an anchor jump.
 */
export default function BookButton({
  children = 'Book an appointment',
  className = 'btn--lg',
  onClick,
}: Props) {
  return (
    <Link to={BOOKING_PATH} className={`btn btn--book ${className}`} onClick={onClick}>
      <span className="btn__label">{children}</span>
      <ArrowNode />
    </Link>
  )
}
