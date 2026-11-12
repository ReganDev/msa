/* ============================================================
   Structured data (schema.org JSON-LD)
   ------------------------------------------------------------
   Tells search engines, in their own vocabulary, what the pages
   already say in prose: who the practice is, where it is, what
   it charges. scripts/prerender.mjs writes the result into the
   <head> of every page.

   Everything here is read from src/data.ts or repeats a fact
   that is already visible on the site. Nothing is stated here
   that a visitor cannot also read on a page:
     - no opening hours and no phone number, because the site
       doesn't publish either. Add them here when it does.
     - no star rating. Google's guidelines don't allow a business
       to mark up reviews it collected from elsewhere, and the
       reviews on the home page come from the Google listing.
   ============================================================ */

import {
  EMAIL,
  INSTAGRAM_URL,
  MAPS_URL,
  POSTAL_ADDRESS,
  services,
  tierLabel,
} from '../data'
import type { RouteDef } from '../routes'

/** The share image, also used as the business's picture. See scripts/make-share-image.mjs. */
export const SHARE_IMAGE = {
  path: '/share.jpg',
  width: 1200,
  height: 630,
  alt: 'Matthew Knight, osteopath and sports massage therapist in Orpington',
}

const BUSINESS_NAME = 'Knight Osteopathy'

/** Short names for the breadcrumb trail; the page titles are too long for it. */
const BREADCRUMB_NAMES: Record<string, string> = {
  '/osteopathy': 'Osteopathy',
  '/spinal-manipulation': 'Spinal Manipulation',
  '/locations/orpington': 'Orpington Clinic',
  '/booking': 'Booking',
  '/conditions': 'Conditions',
  '/blog': 'Blog',
}

const pageUrl = (siteUrl: string, path: string) =>
  `${siteUrl}${path === '/' ? '' : path}`

function business(siteUrl: string) {
  const prices = services.flatMap((service) =>
    (service.tiers ?? []).map((tier) => tier.price),
  )

  return {
    '@type': 'MedicalBusiness',
    '@id': `${siteUrl}/#business`,
    name: BUSINESS_NAME,
    description:
      'Osteopathy, dry needling and sports massage in Orpington with Matthew Knight, registered osteopath.',
    url: siteUrl,
    image: `${siteUrl}${SHARE_IMAGE.path}`,
    logo: `${siteUrl}/logo.png`,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: POSTAL_ADDRESS.street,
      addressLocality: POSTAL_ADDRESS.locality,
      postalCode: POSTAL_ADDRESS.postcode,
      addressCountry: POSTAL_ADDRESS.country,
    },
    hasMap: MAPS_URL,
    areaServed: ['Orpington', 'Bromley'],
    currenciesAccepted: 'GBP',
    priceRange: `£${Math.min(...prices)}–£${Math.max(...prices)}`,
    sameAs: [INSTAGRAM_URL],
    founder: { '@id': `${siteUrl}/#matthew-knight` },
    makesOffer: services.flatMap((service) =>
      (service.tiers ?? []).map((tier) => ({
        '@type': 'Offer',
        name: `${service.name}: ${tierLabel(tier)}`,
        price: tier.price,
        priceCurrency: 'GBP',
        url: `${siteUrl}/booking`,
      })),
    ),
  }
}

function practitioner(siteUrl: string) {
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#matthew-knight`,
    name: 'Matthew Knight',
    honorificSuffix: 'M.Ost',
    jobTitle: 'Osteopath and Sports Massage Therapist',
    image: `${siteUrl}/matthew-knight.png`,
    worksFor: { '@id': `${siteUrl}/#business` },
    memberOf: [
      { '@type': 'Organization', name: 'General Osteopathic Council' },
      { '@type': 'Organization', name: 'Institute of Osteopathy' },
    ],
  }
}

function breadcrumbs(siteUrl: string, route: RouteDef) {
  // /blog/some-post sits under /blog; every other page sits under the home page.
  const parent = route.path.startsWith('/blog/') ? '/blog' : undefined
  const trail = [
    { name: 'Home', path: '/' },
    ...(parent ? [{ name: BREADCRUMB_NAMES[parent], path: parent }] : []),
    {
      // A blog post has no short name of its own, so use its title without
      // the site name that every title ends in.
      name: BREADCRUMB_NAMES[route.path] ?? route.title.split(' · ')[0],
      path: route.path,
    },
  ]

  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: pageUrl(siteUrl, crumb.path),
    })),
  }
}

/** The JSON-LD document for one page. */
export function structuredData(siteUrl: string, route: RouteDef) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      business(siteUrl),
      practitioner(siteUrl),
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: BUSINESS_NAME,
        url: siteUrl,
        inLanguage: 'en-GB',
        publisher: { '@id': `${siteUrl}/#business` },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl(siteUrl, route.path)}#page`,
        url: pageUrl(siteUrl, route.path),
        name: route.title,
        description: route.description,
        inLanguage: 'en-GB',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#business` },
      },
      ...(route.path === '/' ? [] : [breadcrumbs(siteUrl, route)]),
    ],
  }
}
