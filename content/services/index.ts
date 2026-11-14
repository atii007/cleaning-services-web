import type { ServiceCategory } from '@/types/content'

import { DEEP_CLEANING } from './deep-cleaning'
import { MAID_SERVICES } from './maid-services'
import { PEST_CONTROL } from './pest-control'

/**
 * Service categories — PLACEHOLDER CONTENT.
 *
 * The single source of truth for every service on the site: nav, mega-menu,
 * footer, home and /services cards, enquiry-form options, routes, sitemap
 * and structured data all derive from this array. To add, remove or reorder
 * a service, edit one file in this folder and this list — no code changes.
 * See docs/CONTENT-GUIDE.md.
 */
export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  DEEP_CLEANING,
  MAID_SERVICES,
  PEST_CONTROL,
]

export const getServiceHref = (slug: string): string => `/services/${slug}`

export const getServiceCategory = (slug: string) =>
  SERVICE_CATEGORIES.find((service) => service.slug === slug)

/** Service links shared by the header, mobile drawer and footer. */
export const SERVICE_NAV_ITEMS = SERVICE_CATEGORIES.map((service) => ({
  label: service.title,
  href: getServiceHref(service.slug),
  description: service.tagline,
  icon: service.icon,
}))

/** Lowest price listed anywhere for a category, for "From …" badges. */
export const getStartingPrice = (service: ServiceCategory) => {
  const prices = [
    ...(service.subServices ?? []).flatMap((sub) =>
      sub.priceFrom === undefined ? [] : [sub.priceFrom]
    ),
    ...(service.plans ?? []).map((plan) => plan.price),
  ]
  return prices.length > 0 ? Math.min(...prices) : undefined
}
