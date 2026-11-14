import { SITE_CONFIG } from '@/content/site'

/**
 * Contact link builders. Kept free of `lib/env` so client components can
 * import them without bundling server-side env validation.
 */
export const getWhatsAppUrl = (
  message = 'Hi, I would like to know more about your services.'
): string =>
  `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`

export const getTelHref = (tel: string): string => `tel:${tel}`
