/* ============================================================
   Matthew Knight - Osteopath & Sports Massage Therapist
   Single source of truth for links, contact details, services and prices.
   ============================================================ */

// --- External links ---
// Booking runs on Acuity: every appointment type and package has its own
// deep link, so there is no single "book" URL. In-site calls to action point
// at /booking, which lists the prices and hands off to the links below.
export const BOOKING_PATH = '/booking'
export const INSTAGRAM_URL = 'https://www.instagram.com/manualtherapymatt/'

const ACUITY_APPOINTMENT =
  'https://app.acuityscheduling.com/schedule.php?owner=11454444&appointmentType='
const ACUITY_PACKAGE =
  'https://app.acuityscheduling.com/catalog.php?owner=11454444&action=addCart&clear=1&id='

// Contact form delivery. The form posts here and api/contact.ts sends the mail
// through Resend. No key belongs in this file or anywhere else under src/:
// everything here ships to the browser in readable form. RESEND_API_KEY lives
// in Vercel's environment variables, and in .env.local for local runs.
export const CONTACT_ENDPOINT = '/api/contact'

// --- Contact & location ---
// Change this and change DEFAULT_TO in api/contact.ts to match: that function
// cannot import from here (see the note at the top of it), so enquiries would
// otherwise keep going to the old address.
export const EMAIL = 'info@knightosteopathy.com'
export const ADDRESS = 'Tennis Centre, Avebury Rd, Orpington BR6 9SA'
export const ADDRESS_NOTE = 'Located inside the Jon W Sports injury clinic'
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Tennis+Centre+Avebury+Rd+Orpington+BR6+9SA'
export const MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=Tennis%20Centre%2C%20Avebury%20Rd%2C%20Orpington%20BR6%209SA&z=15&output=embed'

// --- Services ---
export interface ServiceTier {
  /** Appointment type, e.g. 'Advanced'. */
  name: string
  /** Length of the appointment, e.g. '60 min'. */
  duration: string
  price: number
  /** Acuity deep link for this appointment type. */
  bookingUrl: string
}

/**
 * Name and duration are stored apart so the booking page can put the duration
 * on its own button ("Book 60 min"). Anywhere that only needs the one-line
 * version uses this, so the two pages cannot drift apart.
 */
export const tierLabel = (tier: ServiceTier) =>
  `${tier.name} · ${tier.duration}`

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
      {
        name: 'Advanced',
        duration: '60 min',
        price: 70,
        bookingUrl: `${ACUITY_APPOINTMENT}96983426`,
      },
      {
        name: 'Standard',
        duration: '30 min',
        price: 55,
        bookingUrl: `${ACUITY_APPOINTMENT}96983308`,
      },
    ],
  },
  {
    name: 'Dry Needling',
    image: '/treatment-dry-needling.png',
    imageAlt: 'Sterile dry needling needles used in treatment',
    blurb:
      'Dry needling is an evidence-based therapy that has evolved from ancient Eastern techniques. Fine, sterile needles are inserted into tight or overactive areas of muscle to encourage them to release, helping to reduce tension, ease pain and restore normal movement. It is used as part of a wider treatment plan to complement hands-on care.',
    priceNote: 'In conjunction with sports massage and osteopathy',
  },
  {
    name: 'Sports Massage',
    image: '/treatment-sports-massage.png',
    imageAlt: 'Matthew Knight giving a sports massage to a patient',
    blurb:
      'Sports massage is a targeted soft-tissue therapy that can help reduce muscle tension, support recovery and improve movement and performance. It is suitable for everyone, not just athletes, whether you are managing an injury, training hard or spending long periods sitting at a desk.',
    tiers: [
      {
        name: 'Advanced',
        duration: '60 min',
        price: 60,
        bookingUrl: `${ACUITY_APPOINTMENT}97381701`,
      },
      {
        name: 'Standard',
        duration: '30 min',
        price: 30,
        bookingUrl: `${ACUITY_APPOINTMENT}97381665`,
      },
    ],
  },
]

// --- Sports massage packages ---
// Blocks of sessions bought up front, each priced at 10% below the equivalent
// number of single sessions. Bought through Acuity's catalogue rather than its
// scheduler, so these links add to a cart instead of opening a calendar.

export interface PackageOption {
  sessions: number
  price: number
  bookingUrl: string
}

export interface PackageGroup {
  /** Length of a single session in the block, e.g. '30 min'. */
  duration: string
  /** Price of that session bought on its own — used to show the saving. */
  singlePrice: number
  options: PackageOption[]
}

/** Every package is priced at this discount off the single-session rate. */
export const PACKAGE_DISCOUNT = 0.1

export const sportsMassagePackages: PackageGroup[] = [
  {
    duration: '30 min',
    singlePrice: 30,
    options: [
      { sessions: 6, price: 162, bookingUrl: `${ACUITY_PACKAGE}2266535` },
      { sessions: 9, price: 243, bookingUrl: `${ACUITY_PACKAGE}2266536` },
      { sessions: 12, price: 324, bookingUrl: `${ACUITY_PACKAGE}2266537` },
    ],
  },
  {
    duration: '60 min',
    singlePrice: 60,
    options: [
      { sessions: 6, price: 324, bookingUrl: `${ACUITY_PACKAGE}2266539` },
      { sessions: 9, price: 486, bookingUrl: `${ACUITY_PACKAGE}2266551` },
    ],
  },
]
