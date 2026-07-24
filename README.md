# Matthew Knight — Osteopath & Sports Therapist

A single-page marketing site for Matthew Knight, an osteopath and sports therapist based
at the Tennis Centre, Avebury Rd, Orpington (inside the Jon W Sports injury clinic).

Built with **Vite + React 19 + TypeScript**. No other runtime dependencies. Clean,
calming, healthcare-oriented design.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build
```

## Where content lives

| What | Where |
| --- | --- |
| Booking link, Instagram, email, address, services & prices | `src/data.ts` |
| Section copy (headings, bio, blurbs) | inline in each `src/components/*.tsx` |
| Colours, fonts, spacing (design tokens) | `:root` in `src/index.css` |
| Fonts | `public/fonts/` (self-hosted `.woff2`) |
| Favicon | `public/favicon.svg` |
| Page title / meta / Open Graph | `index.html` |

## Before going live — client to provide

1. **Booking link** — replace `BOOKING_URL` in `src/data.ts`.
2. **Instagram handle** — replace `INSTAGRAM_URL` in `src/data.ts`.
3. **Contact form delivery** — the form in `src/components/Contact.tsx` is fully built
   (fields, validation, success state) but does **not** send email yet. Connect a mail
   service at the `// TODO: wire up a mail service` marker in `handleSubmit`, e.g.
   [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com) — usually just
   a form `action` URL or a small `fetch` POST.
4. **Photos (optional)** — the hero uses a decorative SVG. To use a real portrait, drop an
   `<img>` into `.hero__panel` in `src/components/Hero.tsx` (a slot comment marks the spot).

## Deploy

Static site — the `dist/` output deploys anywhere. `vercel.json` includes an SPA rewrite
for Vercel.

## Sections

Hero → About → Treatments → Location → Contact → Footer, single page with sticky nav and
smooth anchor scrolling.
# msa
