/* ============================================================
   Matthew Knight - Osteopath & Sports Massage Therapist
   Single source of truth for links, contact details and services.
   Swap the two PLACEHOLDER links below when the client provides them.
   ============================================================ */

// --- External links (client to provide) ---
export const BOOKING_URL = 'https://www.bookingbase.co.uk/book/matthew-knight-osteopath-sports-therapist'
export const INSTAGRAM_URL = 'https://www.instagram.com/manualtherapymatt/'

// Contact form delivery. The form posts here and api/contact.ts sends the mail
// through Resend. No key belongs in this file or anywhere else under src/:
// everything here ships to the browser in readable form. RESEND_API_KEY lives
// in Vercel's environment variables, and in .env.local for local runs.
export const CONTACT_ENDPOINT = '/api/contact'

// --- Contact & location ---
// Change this and change DEFAULT_TO in api/contact.ts to match: that function
// cannot import from here (see the note at the top of it), so enquiries would
// otherwise keep going to the old address.
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
      'Osteopathy is a hands-on, whole-body approach that focuses on how interconnected joints and their associated muscles, tendons, ligaments and nerves work together. Matthew assesses these areas to understand what may be contributing to pain or restricted movement, then uses techniques such as soft-tissue work, mobilisation and manipulation, alongside clear advice and exercises, to help you recover and move well.',
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
      'Dry needling is an evidence-based therapy that has evolved from ancient Eastern techniques. Fine, sterile needles are inserted into tight or overactive areas of muscle to encourage them to release, helping to reduce tension, ease pain and restore normal movement. It is used as part of a wider treatment plan to complement hands-on care.',
    priceNote: 'Ask for pricing',
  },
  {
    name: 'Sports Massage',
    image: '/treatment-sports-massage.png',
    imageAlt: 'Matthew Knight giving a sports massage to a patient',
    blurb:
      'Sports massage is a targeted soft-tissue therapy that can help reduce muscle tension, support recovery and improve movement and performance. It is suitable for everyone—not just athletes—whether you are managing an injury, training hard or spending long periods sitting at a desk.',
    tiers: [
      { label: '60 min', price: 60 },
      { label: '45 min', price: 45 },
      { label: '30 min', price: 30 },
    ],
  },
]
