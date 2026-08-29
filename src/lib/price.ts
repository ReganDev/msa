/**
 * Prices are whole pounds nearly everywhere on the site, so the formatter drops
 * the decimals — but only when there is nothing to drop. Half of £55 is £27.50,
 * and rounding that to £28 would put a price on the page that nobody is
 * actually charged. Shared so the service cards and the booking page can never
 * drift into rendering the same number two different ways.
 */
export function formatPrice(amount: number): string {
  const digits = Number.isInteger(amount) ? 0 : 2
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount)
}
