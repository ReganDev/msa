/**
 * The one chevron on the site. Both places that use it — the nav's conditions
 * dropdown and the condition accordions — rotate it 180° when their thing is
 * open, so it is worth them being the same glyph at the same weight.
 */
export default function Chevron({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
