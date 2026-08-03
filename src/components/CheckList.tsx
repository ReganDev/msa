/** Ticked list, used for the "what your assessment will include" checklists. */
export default function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
