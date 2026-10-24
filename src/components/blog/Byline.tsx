import { type Post } from '../../content/blog'
import PostMeta from './PostMeta'

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
          <PostMeta post={post} />
        ) : (
          <p className="byline__meta">Osteopath &amp; sports massage therapist, Orpington</p>
        )}
      </div>
    </div>
  )
}
