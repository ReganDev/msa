import { formatDate, readingMinutes, type Post } from '../../content/blog'

/** "14 October 2026 · 4 min read" */
export default function PostMeta({ post }: { post: Post }) {
  return (
    <p className="post-meta">
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden="true">·</span>
      <span>{readingMinutes(post)} min read</span>
    </p>
  )
}
