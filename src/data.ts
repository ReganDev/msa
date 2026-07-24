/* ============================================================
   Matthew Knight - Osteopath & Sports Therapist
   Single source of truth for links, contact details and services.
   Swap the two PLACEHOLDER links below when the client provides them.
   ============================================================ */

// --- External links (client to provide) ---
export const BOOKING_URL = 'https://PLACEHOLDER-booking-link' // TODO: replace with real booking link
export const INSTAGRAM_URL = 'https://www.instagram.com/manualtherapymatt/'

// --- Contact & location ---
export const EMAIL = 'msaknight2000@gmail.com'
export const ADDRESS = 'Tennis Centre, Avebury Rd, Orpington BR6 9SA'
export const ADDRESS_NOTE = 'Located inside the Jon W Sports injury clinic'
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Tennis+Centre+Avebury+Rd+Orpington+BR6+9SA'
export const MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=Tennis%20Centre%2C%20Avebury%20Rd%2C%20Orpington%20BR6%209SA&z=15&output=embed'

// --- Services ---
export interface Service {
  name: string
  price: number
  blurb: string
}

export const services: Service[] = [
  {
    name: 'Deep Tissue Massage',
    price: 90,
    blurb:
      'Release chronic tension and restore mobility with targeted, body-weight deep tissue therapy.',
  },
  {
    name: 'Hot Stone Massage',
    price: 95,
    blurb: 'Melt muscle tension with deeply relaxing warm basalt stone therapy.',
  },
  {
    name: 'Craniosacral Therapy',
    price: 95,
    blurb: 'Gentle touch eases tension and restores natural rhythm from head to spine.',
  },
]
