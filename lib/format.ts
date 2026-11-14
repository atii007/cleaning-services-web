import { SITE_CONFIG } from '@/content/site'

const PRICE_FORMAT = new Intl.NumberFormat(SITE_CONFIG.currency.locale, {
  style: 'currency',
  currency: SITE_CONFIG.currency.code,
  maximumFractionDigits: 0,
})

/** Formats a content price (a plain number) in the site currency. */
export const formatPrice = (amount: number): string =>
  PRICE_FORMAT.format(amount)

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

/** Formats an ISO content date ("2026-10-28") as "28 Oct 2026". */
export const formatDate = (isoDate: string): string =>
  DATE_FORMAT.format(new Date(isoDate))

/** "Sara M." → "SM". Used for avatar placeholders. */
export const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
