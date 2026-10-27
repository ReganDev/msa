import { PortableText, toPlainText, type PortableTextComponents } from '@portabletext/react'
import { headingId, type BodyBlock, type NoteBlock } from '../../content/blog'

/**
 * Maps Sanity's Portable Text onto the article styles. h2s get stable ids so a
 * section can be linked to directly; links that leave the site open in a new
 * tab; the "note" block is the quiet panel used for red-flag advice.
 */
const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => <h2 id={headingId(toPlainText(value))}>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="article__quote">
        <p>{children}</p>
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? ''
      const external = /^https?:\/\//.test(href)
      return (
        <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      )
    },
  },
  types: {
    note: ({ value }: { value: NoteBlock }) => (
      <aside className="article__note">
        {value.title && <p className="article__note-title">{value.title}</p>}
        <p>{value.text}</p>
      </aside>
    ),
  },
}

export default function PostBody({ blocks }: { blocks: BodyBlock[] }) {
  return (
    <div className="article">
      <PortableText value={blocks} components={components} />
    </div>
  )
}
