/* ============================================================
   Route manifest
   ------------------------------------------------------------
   Single source of truth for every URL on the site. Consumed by:
     - src/App.tsx            (page titles / descriptions per route)
     - scripts/prerender.mjs  (which static HTML files to emit)
   Add a route here and it is prerendered automatically.
   ============================================================ */

import { allPosts } from './content/blog'

export interface RouteDef {
  path: string
  title: string
  description: string
}

const SITE_NAME = 'Matthew Knight'

/**
 * Production origin, no trailing slash. The prerender uses it for every
 * absolute URL a search engine reads: <link rel="canonical">, og:url, the share
 * image, the structured data, sitemap.xml and robots.txt. It has to be the
 * address the site is finally served from, redirects and all (the bare domain
 * and knightosteopathy.com both redirect here). Leave empty to omit all of it.
 */
export const SITE_URL = 'https://www.orpingtonosteopaths.com'

export const HOME_TITLE =
  'Matthew Knight · Osteopath & Sports Massage Therapist · Orpington'
export const HOME_DESCRIPTION =
  'Matthew Knight - Osteopath & Sports Massage Therapist in Orpington. Osteopathy, dry needling and sports massage at the Tennis Centre, Avebury Rd, inside the Jon W Sports injury clinic. Book an appointment.'

function blogRoutes(): RouteDef[] {
  return [
    {
      path: '/blog',
      title: `Blog · Osteopath in Orpington · ${SITE_NAME}`,
      description:
        'Plain-English articles on pain, movement and recovery from Matthew Knight, osteopath and sports massage therapist in Orpington.',
    },
    // One page per post. Title and excerpt come from the post itself, so a new
    // post is prerendered with its own <title> and description automatically.
    ...allPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      title: `${post.title} · ${SITE_NAME}`,
      description: post.excerpt,
    })),
  ]
}

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
    path: '/booking',
    title: `Book an Appointment · Prices · Osteopath in Orpington · ${SITE_NAME}`,
    description:
      'Book osteopathy or sports massage in Orpington with Matthew Knight. Prices for 30 and 60 minute appointments, plus sports massage packages of 6, 9 and 12 sessions at 10% off.',
  },
  {
    path: '/conditions',
    title: `Common Injuries & Conditions · Osteopath in Orpington · ${SITE_NAME}`,
    description:
      'Lower back pain, sciatica, neck pain, cervicogenic headaches, shoulder, elbow, hip, knee and ankle problems. What each involves, the symptoms people describe and how osteopathy may help. Orpington clinic.',
  },
  // Behind the blog flag (src/features.json): with it off, no blog pages are
  // prerendered at all.
  ...(__BLOG_ENABLED__ ? blogRoutes() : []),
]

/**
 * The "page not found" screen, shown for any address that isn't in `routes`.
 * Deliberately not in that list, so it gets no sitemap entry and no canonical
 * URL. The prerender writes it to dist/404.html, which the host serves, with a
 * 404 status, for every address that has no file of its own.
 */
export const NOT_FOUND: RouteDef = {
  path: '/404',
  title: `Page not found · ${SITE_NAME}`,
  description:
    'That page may have moved or no longer exists. Find osteopathy, sports massage, conditions and booking from the home page.',
}

export const routeByPath = new Map(routes.map((route) => [route.path, route]))
