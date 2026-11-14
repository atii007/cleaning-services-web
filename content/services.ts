import { PLACEHOLDER_IMAGES } from '@/content/images'
import type { ServiceCategory } from '@/types/content'

/**
 * Top-level service categories — PLACEHOLDER CONTENT.
 * Sub-services, FAQs and area pages will be added in Phases 3–4.
 */
export const SERVICE_CATEGORIES = [
  {
    slug: 'deep-cleaning',
    title: 'Deep Cleaning',
    tagline: 'Villas, apartments, kitchens and offices',
    summary:
      'Top-to-bottom cleaning for apartments, villas, kitchens and commercial spaces using eco-friendly products and steam sanitisation.',
    icon: 'sparkles',
    image: PLACEHOLDER_IMAGES.windowCleaning,
  },
  {
    slug: 'maid-services',
    title: 'Maid Services',
    tagline: 'Hourly, daily and monthly housemaids',
    summary:
      'Trained, vetted housemaids by the hour, day or month — flexible plans that fit your schedule.',
    icon: 'house',
    image: PLACEHOLDER_IMAGES.vacuuming,
  },
  {
    slug: 'pest-control',
    title: 'Pest Control',
    tagline: 'Cockroaches, bed bugs, rodents and more',
    summary:
      'Licensed treatments for cockroaches, bed bugs, rodents and more, with safe products and follow-up visits.',
    icon: 'shield',
    image: PLACEHOLDER_IMAGES.gloves,
  },
] as const satisfies readonly ServiceCategory[]

export const getServiceHref = (slug: string): string => `/services/${slug}`

/** Service links shared by the header, mobile drawer and footer. */
export const SERVICE_NAV_ITEMS = SERVICE_CATEGORIES.map((service) => ({
  label: service.title,
  href: getServiceHref(service.slug),
  description: service.tagline,
  icon: service.icon,
}))
