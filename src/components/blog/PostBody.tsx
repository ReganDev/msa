import { headingId, type Block } from '../../content/blog'

/**
 * Renders a post's body blocks. Styling lives on `.article` so each layout can
 * place the column without restating the typography. h2s get stable ids so a
 * contents list can link to them.
 */
export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="article">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return <p key={i}>{block.text}</p>
          case 'h2':
            return (
              <h2 key={i} id={headingId(block.text)}>
                {block.text}
              </h2>
            )
          case 'h3':
            return <h3 key={i}>{block.text}</h3>
          case 'ul':
            return (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            )
          case 'quote':
            return (
              <blockquote key={i} className="article__quote">
                <p>{block.text}</p>
              </blockquote>
            )
          case 'note':
            return (
              <aside key={i} className="article__note">
                {block.title && <p className="article__note-title">{block.title}</p>}
                <p>{block.text}</p>
              </aside>
            )
        }
      })}
    </div>
  )
}
