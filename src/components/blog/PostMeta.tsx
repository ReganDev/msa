import { readingMinutes, type Post } from '../../content/blog'
import PostedAgo from './PostedAgo'

/** "Posted 2 weeks ago · 4 min read" */
export default function PostMeta({ post }: { post: Post }) {
  return (
    <p className="post-meta">
      <PostedAgo iso={post.publishedAt} />
      <span aria-hidden="true"> · </span>
      {readingMinutes(post)} min read
    </p>
  )
}
