import TransitionLink from '../components/blog/TransitionLink'
import PostMeta from '../components/blog/PostMeta'
import { allPosts } from '../content/blog'

/**
 * A contents page, not a card wall: one lead story, then a quiet ruled list
 * that reads top to bottom like the index of a journal. Each cover carries a
 * view-transition-name so it grows into the article header on click.
 */
export default function BlogIndex() {
  const [lead, ...rest] = allPosts

  return (
    <div className="blog">
      <header className="blog-head container">
        <p className="page-hero__eyebrow">Blog</p>
        <h1 className="blog-head__title">
          Notes from the <em>treatment room</em>
        </h1>
        <p className="blog-head__lead">
          Plain-English writing on pain, movement and recovery, drawn from the questions
          people ask in clinic every week.
        </p>
      </header>

      <section className="container">
        {lead ? (
          <TransitionLink to={`/blog/${lead.slug}`} className="blog-lead">
            <div className="blog-lead__media">
              <img
                src={lead.cover}
                alt=""
                style={{ viewTransitionName: `cover-${lead.slug}` }}
              />
            </div>
            <div className="blog-lead__copy">
              <p className="blog-kicker">Latest · {lead.topic}</p>
              <h2 className="blog-lead__title">{lead.title}</h2>
              <p className="blog-lead__excerpt">{lead.excerpt}</p>
              <PostMeta post={lead} />
              <span className="blog-read">
                Read the article
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </TransitionLink>
        ) : (
          <p className="blog-empty">The first articles are on their way. Check back soon.</p>
        )}

        <ol className="blog-list">
          {rest.map((post) => (
            <li key={post.slug}>
              <TransitionLink to={`/blog/${post.slug}`} className="blog-row">
                <p className="blog-row__topic">{post.topic}</p>
                <div className="blog-row__copy">
                  <h2 className="blog-row__title">{post.title}</h2>
                  <p className="blog-row__excerpt">{post.excerpt}</p>
                  <PostMeta post={post} />
                </div>
                <div className="blog-row__thumb">
                  <img
                    src={post.cover}
                    alt=""
                    loading="lazy"
                    style={{ viewTransitionName: `cover-${post.slug}` }}
                  />
                </div>
              </TransitionLink>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
