/**
 * The arrow disc that sits inside a split-capsule button. Shared by BookButton
 * and the per-row Acuity links on /booking so the capsule is only drawn one way.
 */
export default function ArrowNode() {
  return (
    <span className="btn__node" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h13m-5-6 6 6-6 6" />
      </svg>
    </span>
  )
}
