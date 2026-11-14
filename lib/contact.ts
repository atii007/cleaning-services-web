import { SERVICE_CATEGORIES } from '@/content/services'
import { SITE_CONFIG } from '@/content/site'
import type { EnquiryValues } from '@/schemas/enquiry'

/**
 * Contact link builders. Kept free of `lib/env` so client components can
 * import them without bundling server-side env validation.
 */
export const getWhatsAppUrl = (
  message = 'Hi, I would like to know more about your services.'
): string =>
  `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`

export const getTelHref = (tel: string): string => `tel:${tel}`

export const getServiceLabel = (value: string): string =>
  SERVICE_CATEGORIES.find((service) => service.slug === value)?.title ??
  'Other / not sure'

/** Readable multi-line WhatsApp message for an enquiry. Skips empty fields. */
export const buildEnquiryMessage = (values: EnquiryValues): string => {
  const lines = [
    `Hi ${SITE_CONFIG.shortName}, I'd like to book a service.`,
    '',
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    values.email ? `Email: ${values.email}` : null,
    `Service: ${getServiceLabel(values.service)}`,
    values.area ? `Area: ${values.area}` : null,
    values.preferredDate ? `Preferred date: ${values.preferredDate}` : null,
    values.message ? `\nDetails: ${values.message}` : null,
  ]
  return lines.filter((line) => line !== null).join('\n')
}

/** WhatsApp message for booking one specific sub-service. */
export const getBookingMessage = (category: string, subService: string) =>
  `Hi ${SITE_CONFIG.shortName}, I'd like to book ${subService} (${category}). Please share availability and pricing.`

/** WhatsApp message for booking a service in a specific area. */
export const getAreaBookingMessage = (service: string, area: string) =>
  `Hi ${SITE_CONFIG.shortName}, I'd like to book ${service.toLowerCase()} in ${area}. Please share availability and pricing.`
