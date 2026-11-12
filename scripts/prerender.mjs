/* ============================================================
   Static prerender
   ------------------------------------------------------------
   Runs after `vite build` (client) and `vite build --ssr`.
   Renders every route in src/routes.ts to real HTML so each page
   is served with its own content, <title> and meta description
   rather than an empty SPA shell.

   Adding a route to src/routes.ts is all that is needed — this
   script picks it up automatically.

   When SITE_URL is set in src/routes.ts it also writes what search
   engines need to find and understand those pages: a canonical URL,
   share image and structured data in each page's <head>, plus
   sitemap.xml and robots.txt.
   ============================================================ */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js')

const escapeAttr = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const escapeText = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Replace the content="..." of a meta tag matched by attribute selector. */
function setMeta(html, attr, name, value) {
  const pattern = new RegExp(
    `(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`,
    'i',
  )
  if (pattern.test(html)) {
    return html.replace(pattern, `$1${escapeAttr(value)}$2`)
  }
  // Not present in the template — append into <head>.
  return html.replace(
    '<!--app-head-->',
    `<meta ${attr}="${name}" content="${escapeAttr(value)}" />\n    <!--app-head-->`,
  )
}

const pageUrl = (siteUrl, path) => `${siteUrl}${path === '/' ? '' : path}`

/** Every prerendered page, one <url> each. The route manifest is the list. */
function sitemapXml(siteUrl, routes) {
  const urls = routes
    .map((route) => `  <url><loc>${escapeText(pageUrl(siteUrl, route.path))}</loc></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/** Everything may be crawled except the contact form's endpoint. */
function robotsTxt(siteUrl) {
  const lines = ['User-agent: *', 'Allow: /', 'Disallow: /api/']
  if (siteUrl) lines.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
  return `${lines.join('\n')}\n`
}

async function main() {
  const template = await readFile(join(distDir, 'index.html'), 'utf8')

  if (!template.includes('<!--app-html-->')) {
    throw new Error(
      'index.html is missing the <!--app-html--> placeholder — prerender cannot run.',
    )
  }

  const { render, routes, SITE_URL, SHARE_IMAGE, structuredData } = await import(
    pathToFileURL(ssrEntry).href
  )

  for (const route of routes) {
    const appHtml = render(route.path)

    let html = template
      .replace('<!--app-html-->', appHtml)
      .replace(/<title>[^<]*<\/title>/i, `<title>${escapeText(route.title)}</title>`)

    html = setMeta(html, 'name', 'description', route.description)
    html = setMeta(html, 'property', 'og:title', route.title)
    html = setMeta(html, 'property', 'og:description', route.description)

    if (SITE_URL) {
      const url = pageUrl(SITE_URL, route.path)
      html = setMeta(html, 'property', 'og:url', url)
      html = setMeta(html, 'property', 'og:image', `${SITE_URL}${SHARE_IMAGE.path}`)
      html = setMeta(html, 'property', 'og:image:width', String(SHARE_IMAGE.width))
      html = setMeta(html, 'property', 'og:image:height', String(SHARE_IMAGE.height))
      html = setMeta(html, 'property', 'og:image:alt', SHARE_IMAGE.alt)
      // "<" is escaped so no text in the data can close the script element.
      const jsonLd = JSON.stringify(structuredData(SITE_URL, route)).replace(/</g, '\\u003c')
      html = html.replace(
        '<!--app-head-->',
        // A function, so a "$" in the data is never read as a replacement pattern.
        () =>
          `<link rel="canonical" href="${escapeAttr(url)}" />\n    <script type="application/ld+json">${jsonLd}</script>\n    <!--app-head-->`,
      )
    }

    // Written twice so the page resolves with or without a trailing slash:
    //   dist/osteopathy.html        -> served at /osteopathy
    //   dist/osteopathy/index.html  -> served at /osteopathy/
    // Static hosts differ on which form they look for first; emitting both
    // means neither falls through to the SPA rewrite in vercel.json.
    const outFiles =
      route.path === '/'
        ? [join(distDir, 'index.html')]
        : [
            join(distDir, `${route.path}.html`),
            join(distDir, route.path, 'index.html'),
          ]

    for (const outFile of outFiles) {
      await mkdir(dirname(outFile), { recursive: true })
      await writeFile(outFile, html, 'utf8')
    }
    console.log(`prerendered  ${route.path}`)
  }

  console.log(`\n${routes.length} pages written to dist/`)

  await writeFile(join(distDir, 'robots.txt'), robotsTxt(SITE_URL), 'utf8')
  if (SITE_URL) {
    await writeFile(join(distDir, 'sitemap.xml'), sitemapXml(SITE_URL, routes), 'utf8')
    console.log('robots.txt and sitemap.xml written to dist/')
  } else {
    console.log('robots.txt written to dist/ (no sitemap: SITE_URL is empty)')
  }
}

main().catch((error) => {
  console.error('\nPrerender failed:\n', error)
  process.exit(1)
})
