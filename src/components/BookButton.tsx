import { Link } from 'react-router-dom'
import { BOOKING_PATH } from '../data'

interface Props {
  /** Button label. Defaults to the wording the client uses across the new pages. */
  children?: React.ReactNode
  /** Extra modifier classes, e.g. 'btn--lg' */
  className?: string
}

/**
 * The booking call-to-action. Acuity gives every appointment type and package
 * its own deep link, so there is no single URL to send people to — this points
 * at /booking, which lists the prices and hands off to the right Acuity link.
 */
export default function BookButton({
  children = 'Book an appointment',
  className = 'btn--lg',
}: Props) {
  return (
    <Link to={BOOKING_PATH} className={`btn btn--primary ${className}`}>
      {children}
    </Link>
  )
}
