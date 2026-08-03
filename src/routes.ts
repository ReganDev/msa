/* ============================================================
   Route manifest
   ------------------------------------------------------------
   Single source of truth for every URL on the site. Consumed by:
     - src/App.tsx            (page titles / descriptions per route)
     - scripts/prerender.mjs  (which static HTML files to emit)
   Add a route here and it is prerendered automatically.
   ============================================================ */

export interface RouteDef {
  path: string
  title: string
  description: string
}

const SITE_NAME = 'Matthew Knight'

/**
 * Production origin, no trailing slash — used to emit <link rel="canonical">
 * and og:url when prerendering. Leave empty to omit those tags.
 * CLIENT TO CONFIRM the live domain before launch.
 */
export const SITE_URL = ''

export const HOME_TITLE =
  'Matthew Knight · Osteopath & Sports Massage Therapist · Orpington'
export const HOME_DESCRIPTION =
  'Matthew Knight - Osteopath & Sports Massage Therapist in Orpington. Osteopathy, dry needling and sports massage at the Tennis Centre, Avebury Rd, inside the Jon W Sports injury clinic. Book an appointment.'

export const routes: RouteDef[] = [
  {
    path: '/',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  {
    path: '/osteopathy',
    title: `What is Osteopathy? · Osteopath in Orpington · ${SITE_NAME}`,
    description:
      'What osteopathy is, what to expect from an appointment and the conditions it commonly helps with. Osteopathy in Orpington with Matthew Knight, M.Ost.',
  },
  {
    path: '/spinal-manipulation',
    title: `Spinal Manipulation Explained · ${SITE_NAME} · Orpington`,
    description:
      'What spinal manipulation is, what the clicking sound means, what it can help with and how you might feel afterwards. Osteopathy in Orpington with Matthew Knight.',
  },
  {
    path: '/locations/orpington',
    title: `Osteopathy & Sports Injury Clinic in Orpington · ${SITE_NAME}`,
    description:
      'Osteopathy and sports injury clinic in Orpington at the Tennis Centre, Avebury Rd BR6 9SA. Treatments, conditions treated, clinic address and how to book.',
  },
  {
    path: '/conditions',
    title: `Common Injuries & Conditions · Osteopath in Orpington · ${SITE_NAME}`,
    description:
      'Lower back pain, sciatica, neck pain, cervicogenic headaches, shoulder, elbow, hip, knee and ankle problems — what each involves, the symptoms people describe and how osteopathy may help. Orpington clinic.',
  },
]

export const routeByPath = new Map(routes.map((route) => [route.path, route]))
