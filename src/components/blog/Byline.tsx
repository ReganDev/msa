import { formatDate, readingMinutes, type Post } from '../../content/blog'

/**
 * Matthew's photo and name, with the date and reading time when a post is
 * given. Heads every article, and the blog index without the post details.
 */
export default function Byline({ post }: { post?: Post }) {
  return (
    <div className="byline">
      <img
        className="byline__photo"
        src="/matthew-knight.png"
        alt=""
        width="48"
        height="48"
      />
      <div>
        <p className="byline__name">Matthew Knight, M.Ost</p>
        {post ? (
          <p className="byline__meta">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true"> · </span>
            {readingMinutes(post)} min read
          </p>
        ) : (
          <p className="byline__meta">Osteopath &amp; sports massage therapist, Orpington</p>
        )}
      </div>
    </div>
  )
}
