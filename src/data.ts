/* ============================================================
   Matthew Knight - Osteopath & Sports Massage Therapist
   Single source of truth for links, contact details and services.
   Swap the two PLACEHOLDER links below when the client provides them.
   ============================================================ */

// --- External links (client to provide) ---
export const BOOKING_URL = 'https://www.bookingbase.co.uk/book/matthew-knight-osteopath-sports-therapist'
export const INSTAGRAM_URL = 'https://www.instagram.com/manualtherapymatt/'

// Contact form delivery. Create a free form at https://formspree.io (point it at
// the EMAIL below), then paste its endpoint here, e.g.
// 'https://formspree.io/f/abcdwxyz'. Until a real endpoint is set, the form
// tells the visitor to email directly instead of silently failing.
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_FORM_ID'

// --- Contact & location ---
export const EMAIL = 'msaknight2000@gmail.com'
export const ADDRESS = 'Tennis Centre, Avebury Rd, Orpington BR6 9SA'
export const ADDRESS_NOTE = 'Located inside the Jon W Sports injury clinic'
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Tennis+Centre+Avebury+Rd+Orpington+BR6+9SA'
export const MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=Tennis%20Centre%2C%20Avebury%20Rd%2C%20Orpington%20BR6%209SA&z=15&output=embed'

// --- Services ---
export interface ServiceTier {
  label: string
  price: number
}

export interface Service {
  name: string
  image: string
  imageAlt: string
  blurb: string
  tiers?: ServiceTier[]
  priceNote?: string
  /** Internal route for treatments that have their own page. */
  href?: string
}

export const services: Service[] = [
  {
    name: 'Osteopathy',
    href: '/osteopathy',
    image: '/treatment-osteopathy.png',
    imageAlt: 'Matthew Knight performing a knee assessment on a patient',
    blurb:
      'A hands-on, whole-body approach to assessing and treating pain and restricted movement. Matthew looks at how your joints, muscles and nerves work together, then uses techniques such as soft-tissue work, mobilisation and manipulation — alongside clear advice and exercises — to help you recover and move well.',
    tiers: [
      { label: 'New patient · 1 hour', price: 65 },
      { label: 'Returning · 45 min', price: 50 },
      { label: 'Returning · 30 min', price: 45 },
    ],
  },
  {
    name: 'Dry Needling',
    image: '/treatment-dry-needling.png',
    imageAlt: 'Sterile dry needling needles used in treatment',
    blurb:
      'Fine, sterile needles are inserted into tight or overactive muscle trigger points to release tension, ease pain and restore normal movement. Used as part of a wider treatment plan to complement hands-on care.',
    priceNote: 'Ask for pricing',
  },
  {
    name: 'Sports Massage',
    image: '/treatment-sports-massage.png',
    imageAlt: 'Matthew Knight giving a sports massage to a patient',
    blurb:
      "Targeted soft-tissue treatment to relieve muscular tension, aid recovery and support performance. Suitable for everyone — not just athletes — whether you're managing an injury, training hard or sitting at a desk all day.",
    tiers: [
      { label: '60 min', price: 60 },
      { label: '45 min', price: 45 },
      { label: '30 min', price: 30 },
    ],
  },
]
