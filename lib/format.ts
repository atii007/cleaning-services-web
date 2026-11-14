import { SITE_CONFIG } from '@/content/site'

const PRICE_FORMAT = new Intl.NumberFormat(SITE_CONFIG.currency.locale, {
  style: 'currency',
  currency: SITE_CONFIG.currency.code,
  maximumFractionDigits: 0,
})

/** Formats a content price (a plain number) in the site currency. */
export const formatPrice = (amount: number): string =>
  PRICE_FORMAT.format(amount)
