import { Link } from 'react-router-dom'
import Byline from '../components/blog/Byline'
import PostMeta from '../components/blog/PostMeta'
import { allPosts } from '../content/blog'

/** Text-only list of posts, newest first. */
export default function BlogIndex() {
  return (
    <div className="blog">
      <header className="blog__head">
        <h1 className="blog__title">Blog</h1>
        <p className="blog__lead">
          Plain-English articles on pain, movement and recovery.
        </p>
        <Byline />
      </header>

      {allPosts.length ? (
        <ol className="blog-list">
          {allPosts.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="blog-list__link">
                <h2 className="blog-list__title">{post.title}</h2>
                <p className="blog-list__excerpt">{post.excerpt}</p>
                <PostMeta post={post} />
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="blog__empty">The first articles are on their way. Check back soon.</p>
      )}
    </div>
  )
}
