import { useEffect, useState } from 'react'
import { formatDate, timeAgo } from '../../content/blog'

/**
 * "Posted 2 weeks ago". The pages are prerendered, so a relative time baked in
 * at build would go stale: the HTML carries the full date, and the reader's
 * browser swaps in the relative form once it has hydrated. The full date stays
 * on hover.
 */
export default function PostedAgo({ iso }: { iso: string }) {
  const [ago, setAgo] = useState<string | null>(null)
  useEffect(() => setAgo(timeAgo(iso)), [iso])

  return (
    <time dateTime={iso} title={formatDate(iso)}>
      Posted {ago ?? `on ${formatDate(iso)}`}
    </time>
  )
}
