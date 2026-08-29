import { useEffect, useRef, useState } from 'react'
import { PROMO } from '../lib/promo'

/**
 * The offer stated in full, directly above the prices it changes. The bar in
 * the nav is a headline; this is where the terms live — what is included, what
 * is not, and the code itself, sized to be read off a phone and typed into
 * Acuity on the next screen.
 *
 * Present in the run-up as well as during September, because the bar links
 * here: arriving from an announcement to a page that says nothing about it
 * would be a dead end. Only the wording changes — the prices below stay at full
 * price until the offer actually opens.
 */
export default function PromoPanel() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMO.code)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2400)
    } catch {
      /* Clipboard access is refused in some browsers and over plain HTTP. The
         code is selectable text either way, so there is nothing to recover
         from — the button simply does not confirm. */
    }
  }

  return (
    <aside className="promo-panel reveal" aria-labelledby="promo-panel-title">
      <div className="promo-panel__body">
        <p className="promo-panel__eyebrow">
          <span className="promo-soon">Coming in September</span>
          <span className="promo-live">September offer</span>
        </p>
        <h2 className="promo-panel__title" id="promo-panel-title">
          Half price, all September
        </h2>
        <p className="promo-panel__lead">
          <span className="promo-soon">
            Every single osteopathy and sports massage appointment is{' '}
            {PROMO.headline} {PROMO.period}. Note the code now and add it when
            you book. Packages are already discounted and are not included.
          </span>
          <span className="promo-live">
            Every single osteopathy and sports massage appointment is{' '}
            {PROMO.headline} {PROMO.period}. Add the code when you book.
            Packages are already discounted and are not included.
          </span>
        </p>
      </div>

      <div className="promo-panel__code">
        <span className="promo-panel__code-label" id="promo-code-label">
          <span className="promo-soon">Code, from 1 September</span>
          <span className="promo-live">Your code</span>
        </span>
        <span className="promo-panel__code-value">{PROMO.code}</span>
        <button
          type="button"
          className="promo-panel__copy"
          onClick={copy}
          aria-describedby="promo-code-label"
        >
          {copied ? 'Copied' : 'Copy code'}
        </button>
        {/* Announced on change rather than on render, so the confirmation
            reaches a screen reader without the button relabelling silently. */}
        <span className="visually-hidden" role="status">
          {copied ? `${PROMO.code} copied to clipboard` : ''}
        </span>
      </div>
    </aside>
  )
}
