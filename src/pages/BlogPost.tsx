import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import AuthorSignoff from '../components/blog/AuthorSignoff'
import PostBody from '../components/blog/PostBody'
import PostMeta from '../components/blog/PostMeta'
import TransitionLink from '../components/blog/TransitionLink'
import CtaBand from '../components/CtaBand'
import { outline, postBySlug, relatedPosts, type Post } from '../content/blog'
import { useActiveHeading } from '../hooks/useActiveHeading'
import { useReadingProgress } from '../hooks/useReadingProgress'
import NotFound from './NotFound'

/** An unknown slug is a genuine 404, same as an unknown condition. */
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? postBySlug.get(slug) : undefined
  if (!post) return <NotFound />
  // Keyed so moving between posts starts the scroll-spy and progress afresh.
  return <Article key={post.slug} post={post} />
}

/**
 * The article as the product. The cover arrives by morphing out of the card
 * that was clicked; beside the text, a contents rail doubles as the progress
 * thread, filling as the reader moves down and marking the current section.
 */
function Article({ post }: { post: Post }) {
  const sections = outline(post)
  const active = useActiveHeading(sections.map((s) => s.id))
  const bodyRef = useRef<HTMLDivElement>(null)
  useReadingProgress(bodyRef)

  return (
    <article className="blog blog-post">
      <header className="blog-post__head container">
        <TransitionLink to="/blog" className="blog-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          All articles
        </TransitionLink>
        <p className="blog-kicker">{post.topic}</p>
        <h1 className="blog-post__title">{post.title}</h1>
        <p className="blog-post__standfirst">{post.excerpt}</p>
        <PostMeta post={post} />
      </header>

      <figure className="blog-post__cover container">
        <img
          src={post.cover}
          alt={post.coverAlt}
          style={{ viewTransitionName: `cover-${post.slug}` }}
        />
      </figure>

      <div className="blog-post__body container" ref={bodyRef}>
        <div className="blog-thread" aria-hidden="true" />

        {sections.length > 0 && (
          <aside className="blog-rail">
            <nav className="blog-toc" aria-label="In this article">
              <p className="blog-toc__label">In this article</p>
              <ol className="blog-toc__list">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="blog-toc__link"
                      aria-current={active === s.id ? 'location' : undefined}
                    >
                      {s.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}

        <div className="blog-post__text blog-dropcap">
          <PostBody blocks={post.body} />
          <AuthorSignoff />
        </div>
      </div>

      <section className="blog-more container" aria-labelledby="blog-more-title">
        <h2 className="blog-more__title" id="blog-more-title">
          Keep reading
        </h2>
        <ol className="blog-list blog-list--compact">
          {relatedPosts(post).map((other) => (
            <li key={other.slug}>
              <TransitionLink to={`/blog/${other.slug}`} className="blog-row">
                <p className="blog-row__topic">{other.topic}</p>
                <div className="blog-row__copy">
                  <h3 className="blog-row__title">{other.title}</h3>
                  <PostMeta post={other} />
                </div>
                <div className="blog-row__thumb">
                  <img
                    src={other.cover}
                    alt=""
                    loading="lazy"
                    style={{ viewTransitionName: `cover-${other.slug}` }}
                  />
                </div>
              </TransitionLink>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand
        title="Sounds familiar?"
        text="Book an assessment at the Orpington clinic and get a plan built around you."
      />
    </article>
  )
}
