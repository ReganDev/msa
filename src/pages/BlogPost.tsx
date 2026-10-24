import { Link, useParams } from 'react-router-dom'
import Byline from '../components/blog/Byline'
import PostBody from '../components/blog/PostBody'
import PostMeta from '../components/blog/PostMeta'
import CtaBand from '../components/CtaBand'
import { otherPosts, postBySlug } from '../content/blog'
import NotFound from './NotFound'

/** One article: title, Matthew's byline with the reading time, then the text. */
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? postBySlug.get(slug) : undefined
  // An unknown slug is a genuine 404, same as an unknown condition.
  if (!post) return <NotFound />

  const more = otherPosts(post)

  return (
    <>
      <article className="blog">
        <header className="blog__head">
          <Link to="/blog" className="blog__back">
            &larr; All articles
          </Link>
          <h1 className="blog__title blog__title--post">{post.title}</h1>
          <Byline post={post} />
        </header>

        <PostBody blocks={post.body} />

        {more.length > 0 && (
          <aside className="blog-more" aria-labelledby="blog-more-title">
            <h2 className="blog-more__title" id="blog-more-title">
              More articles
            </h2>
            <ol className="blog-list">
              {more.map((other) => (
                <li key={other.slug}>
                  <Link to={`/blog/${other.slug}`} className="blog-list__link">
                    <h3 className="blog-list__title">{other.title}</h3>
                    <PostMeta post={other} />
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        )}
      </article>

      <CtaBand
        title="Sounds familiar?"
        text="Book an assessment at the Orpington clinic and get a plan built around you."
      />
    </>
  )
}
