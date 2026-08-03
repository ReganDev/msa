import { BOOKING_URL } from '../data'

interface Props {
  /** Button label. Defaults to the wording the client uses across the new pages. */
  children?: React.ReactNode
  /** Extra modifier classes, e.g. 'btn--lg' */
  className?: string
}

/**
 * The booking call-to-action. Booking is handled by an external system, so this
 * is always a real external link rather than a router <Link>.
 */
export default function BookButton({
  children = 'Book an appointment',
  className = 'btn--lg',
}: Props) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn--primary ${className}`}
    >
      {children}
    </a>
  )
}
