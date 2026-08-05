import MapPanel from '../components/MapPanel'

/**
 * Pared back to the clinic block alone. MapPanel carries the address, email and
 * a booking action, and takes the page's h1 here because nothing above it does.
 */
export default function OrpingtonClinic() {
  return (
    <MapPanel
      primary
      heading="Visiting the Osteopath Clinic in Orpington — Clinic Address and Location"
      intro="Free parking is available at the Tennis Centre."
    />
  )
}
