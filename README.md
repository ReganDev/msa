# Matthew Knight — Osteopath & Sports Therapist

A marketing site for Matthew Knight, an osteopath and sports therapist based at the
Tennis Centre, Avebury Rd, Orpington (inside the Jon W Sports injury clinic).

Built with **Vite + React 19 + TypeScript**, with `react-router-dom` for routing. Clean,
calming, healthcare-oriented design.

Every page is **prerendered to static HTML at build time**, so each URL is served with
its own content, `<title>` and meta description rather than an empty SPA shell — the
pages exist largely for local search, so this matters.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check, build, then prerender every route to dist/
npm run preview   # preview the production build (serves the prerendered HTML)
```

## Pages

| URL | Source |
| --- | --- |
| `/` | `src/pages/Home.tsx` — the original one-pager |
| `/osteopathy` | `src/pages/Osteopathy.tsx` |
| `/spinal-manipulation` | `src/pages/SpinalManipulation.tsx` |
| `/locations/orpington` | `src/pages/OrpingtonClinic.tsx` |
| `/conditions` | `src/pages/ConditionsIndex.tsx` — all 12 conditions, one expandable panel each |
| `/conditions/<slug>` | Retired. Redirects to `/conditions#<slug>` (`vercel.json`, plus a client fallback in `src/App.tsx`) |

## Where content lives

| What | Where |
| --- | --- |
| Booking link, Instagram, email, address, services & prices | `src/data.ts` |
| **All 12 conditions — copy, sections and FAQs** | `src/content/conditions.ts` |
| **URLs, page titles and meta descriptions** | `src/routes.ts` |
| Home-page section copy (headings, bio, blurbs) | inline in each `src/components/*.tsx` |
| Osteopathy / spinal manipulation copy | inline in the matching `src/pages/*.tsx` |
| Colours, fonts, spacing (design tokens) | `:root` in `src/index.css` |
| Fonts | `public/fonts/` (self-hosted `.woff2`) |
| Favicon | `public/favicon.svg` |
| Base HTML template | `index.html` |

### Adding a condition

Add an entry to the `conditions` array in `src/content/conditions.ts` — content only,
no new route. It appears as a new panel on `/conditions`, is linked from the condition
grids on `/osteopathy` and `/locations/orpington`, and is reachable at
`/conditions#<slug>`. Nothing else to wire up.

### Adding any other page

Create the component in `src/pages/`, add a `<Route>` in `src/App.tsx`, and add an entry
to `routes` in `src/routes.ts` so it gets a title, a description and a prerendered file.

## How the prerender works

`npm run build` runs three steps:

1. `vite build` — the normal client bundle, plus `dist/index.html` as a template.
2. `vite build --ssr src/entry-server.tsx` — a server bundle exposing `render(url)`.
3. `node scripts/prerender.mjs` — renders every route in `src/routes.ts` and writes it
   out with its own title and meta tags.

Each page is written twice — `dist/osteopathy.html` and `dist/osteopathy/index.html` —
so it resolves with or without a trailing slash and never falls through to the SPA
rewrite in `vercel.json`. On the client, `src/main.tsx` hydrates that markup rather than
discarding it.

## Before going live — client to provide

1. **Booking link** — replace `BOOKING_URL` in `src/data.ts`.
2. **Instagram handle** — replace `INSTAGRAM_URL` in `src/data.ts`.
3. **Contact form delivery** — wired to [Resend](https://resend.com) through the Vercel
   Function at `api/contact.ts`. All that is outstanding is the credential: add
   `RESEND_API_KEY` in Vercel → Settings → Environment Variables, and copy `.env.example`
   to `.env.local` for local runs. **The key must never be committed or given a `VITE_`
   prefix** — `VITE_*` variables are inlined into the public client bundle. Until the key
   is set the form fails gracefully and points the visitor at the mailto link. Also set
   `CONTACT_FROM` to an address on a domain verified in Resend; the default sender is
   Resend's shared testing address. Note `vite dev` does not run the function — use
   `vercel dev` to exercise the form locally.
4. **Photos (optional)** — the hero uses a decorative SVG. To use a real portrait, drop an
   `<img>` into `.hero__panel` in `src/components/Hero.tsx` (a slot comment marks the spot).
5. **Live domain** — set `SITE_URL` in `src/routes.ts` to the production origin (no
   trailing slash). Until it is set, `<link rel="canonical">` and `og:url` are omitted.
6. **Condition copy sign-off** — the copy in `src/content/conditions.ts` is a draft
   written for Matthew to review. It is deliberately non-diagnostic and outcome-neutral
   to stay within GOsC / ASA advertising rules, so keep that tone when editing.

## Deploy

Static site — the `dist/` output deploys anywhere. `vercel.json` includes an SPA rewrite,
which only applies to URLs with no matching file; the prerendered pages are served
directly.

## Structure

- **Home** — Hero → About → Treatments → Location → Contact, with sticky nav and smooth
  anchor scrolling. Nav links to home sections use `/#about` style paths so they work
  from any page (`src/components/ScrollManager.tsx` handles the scroll).
- **Content pages** — see the Pages table above.
