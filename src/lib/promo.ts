/* ============================================================
   September offer
   ------------------------------------------------------------
   What the offer says. When it runs is decided by the inline
   script in index.html, which adds `has-promo` to <html> before
   the first paint; every promo element is then shown or hidden
   by CSS alone. Keeping the dates there rather than here is
   what stops the page shifting after hydration — and the dates
   live in exactly one place, so there is nothing to keep in
   sync but the wording below.

   To retire the offer: delete the script in index.html. The
   markup stays, permanently hidden, until it is cleaned up.
   ============================================================ */

export const PROMO = {
  code: 'SEPTOSTEO',
  /** 0.5 = half price. Drives the discounted figures, so the prices on the
   *  page can never disagree with the headline. */
  rate: 0.5,
  /** Written out rather than derived: "50%" reads better than "0.5". */
  headline: '50% off',
  /** Running copy, so it has to fit "…is 50% off {period}". Must describe the
   *  same window as the script in index.html. */
  period: 'from 1 to 30 September',
} as const

/** The discounted figure for a full-price appointment. */
export function promoPrice(price: number): number {
  return price * (1 - PROMO.rate)
}
