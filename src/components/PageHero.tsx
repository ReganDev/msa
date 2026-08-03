interface Props {
  /** Small uppercase label above the title */
  eyebrow?: string
  title: string
  /** Intro paragraphs shown under the title */
  lead?: string[]
  /** Header photo. Omit for a single-column, text-only header. */
  image?: string
  imageAlt?: string
  children?: React.ReactNode
}

/**
 * Header for interior pages: copy on the left, framed photo on the right,
 * echoing the home-page <Hero> so the deeper pages read as part of the same
 * site rather than bare documents.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  children,
}: Props) {
  return (
    <section className="page-hero">
      <div
        className={`container page-hero__inner ${
          image ? 'page-hero__inner--media' : ''
        }`}
      >
        <div className="page-hero__copy">
          {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
          <h1 className="page-hero__title">{title}</h1>
          {lead?.map((paragraph) => (
            <p className="page-hero__lead" key={paragraph.slice(0, 40)}>
              {paragraph}
            </p>
          ))}
          {children && <div className="page-hero__actions">{children}</div>}
        </div>

        {image && (
          <div className="page-hero__media">
            <div className="page-hero__panel">
              <img src={image} alt={imageAlt ?? ''} loading="eager" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
