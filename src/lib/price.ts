/**
 * Prices are whole pounds everywhere on the site, so the formatter drops the
 * decimals. Shared so the service cards and the booking page can never drift
 * into rendering the same number two different ways.
 */
export const formatPrice = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
}).format
