/* ============================================================
   Fetch blog posts from Sanity
   ------------------------------------------------------------
   Runs before every build and dev start (see package.json).
   Downloads every published post and writes them to
   src/generated/posts.json, which src/content/blog.ts imports.
   The pages are then prerendered from that file, so visitors
   never talk to Sanity.

   Any failure stops the build. Deploying after a failed fetch
   would publish a blog with no posts, which is worse than
   keeping the previous deploy live.

   The project ID and dataset are not secrets — the dataset is
   public and read-only without a token — so they live here
   rather than in Vercel's environment. Env vars override them,
   which is handy for pointing a local build at another dataset.
   ============================================================ */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const PROJECT_ID = process.env.SANITY_PROJECT_ID ?? 'tgfsg74o'
const DATASET = process.env.SANITY_DATASET ?? 'production'
const API_VERSION = '2025-02-19'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outFile = join(root, 'src', 'generated', 'posts.json')

// Published only (drafts live under the drafts. prefix and are excluded by
// the published perspective). Future-dated posts wait for a later build.
const query = `*[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    publishedAt,
    body
  }`

async function main() {
  // Blog switched off (src/features.json): no posts, and no Sanity call, so
  // the build doesn't depend on Sanity being reachable.
  const features = JSON.parse(await readFile(join(root, 'src', 'features.json'), 'utf8'))
  if (features.blog !== true) {
    await mkdir(dirname(outFile), { recursive: true })
    await writeFile(outFile, '[]\n', 'utf8')
    console.log('blog is switched off in src/features.json; skipped fetching posts')
    return
  }

  if (PROJECT_ID.startsWith('REPLACE')) {
    throw new Error('Sanity project ID is not set in scripts/fetch-posts.mjs.')
  }

  // api.sanity.io rather than the CDN: a build triggered by Publish must see
  // the post that was just published, not a cached result from before it.
  const url = new URL(`https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`)
  url.searchParams.set('query', query)
  url.searchParams.set('perspective', 'published')

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Sanity responded ${response.status}: ${await response.text()}`)
  }
  const { result } = await response.json()
  if (!Array.isArray(result)) {
    throw new Error('Sanity returned no result array.')
  }

  const incomplete = result.filter((p) => !p.title || !p.excerpt || !p.publishedAt || !p.body)
  if (incomplete.length) {
    throw new Error(
      `Published post(s) missing required fields: ${incomplete.map((p) => p.slug).join(', ')}`,
    )
  }

  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(outFile, JSON.stringify(result, null, 2) + '\n', 'utf8')
  console.log(`fetched ${result.length} post(s) from Sanity (${PROJECT_ID}/${DATASET})`)
}

main().catch((error) => {
  console.error('\nFetching blog posts failed:\n', error.message ?? error)
  process.exit(1)
})
