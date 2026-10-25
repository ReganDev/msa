# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People in Orpington and the surrounding Bromley area who are in pain or carrying a sports injury and are looking for an osteopath, usually arriving from a local search. A secondary audience is Matthew's existing patients returning for advice, prices or to rebook.

## Product Purpose

A local-search marketing site for Matthew Knight's osteopathy and sports massage practice. Its job is to turn visitors into bookings: every call to action leads to `/booking`, which lists prices and hands off to the matching Acuity appointment link. The blog exists to build trust in Matthew's expertise and to bring in search traffic.

## Positioning

Matthew Knight, M.Ost, is a GOsC-registered osteopath and sports massage therapist working from the Tennis Centre, Avebury Rd, Orpington, inside the Jon W Sports injury clinic. Treatment combines hands-on work with rehabilitation and looks for the root cause rather than chasing the symptom.

## Operating Context

- Pages are prerendered to static HTML at build time because they exist largely for local search; each URL needs its own content, title and description.
- Booking happens off-site in Acuity; the site never takes payment or holds patient data.
- Blog posts will be written by Matthew in a hosted CMS (Sanity, planned) and published by a site rebuild.

## Capabilities and Constraints

- Services: osteopathy, spinal manipulation, sports massage, dry needling. Dry needling and sports massage page copy is still awaited from Matthew.
- Conditions guide at `/conditions` with client-approved copy.
- Contact form delivered by a Vercel function through Resend.
- Seasonal promotions (e.g. SEPTOSTEO) run on dates set in `index.html`.

## Brand Commitments

- Name: Matthew Knight / Knight Osteopathy. Existing logo and Matthew's own photograph.
- Voice: plain English, calm and reassuring, UK spelling, no hype. Medical claims stay general, and red-flag safety notes ("get urgent help if…") accompany conditions where they apply.
- Credentials shown: GOsC registration and Institute of Osteopathy membership.

## Evidence on Hand

- Matthew's photo: `public/matthew-knight.png`. Treatment photos: `public/treatment-*.png`. Condition images: `public/conditions/`.
- Credential badges: `public/gosc-registered.jpg`, `public/io-member.png`.
- Not available yet, and must not be fabricated: testimonials, reviews, patient numbers, real blog posts (the current posts in `src/content/blog.ts` are placeholders).

## Product Principles

1. Every page earns its place in local search: real content, its own title and description.
2. Booking is the one conversion; it should always be one step away and never compete with other actions.
3. Speak like a clinician explaining things to a patient: clear, honest, never alarmist, never salesy.
4. Matthew's own expertise and voice are the proof; nothing stands in for evidence that doesn't exist.
