import { AREAS } from '@/content/areas'
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

/** Path segment reserved for area pages: /services/<service>/areas/<area>. */
export const AREAS_SEGMENT = 'areas'

// Fail the build early (with a clear message) if content breaks a URL rule.
SERVICE_CATEGORIES.forEach((service) => {
  service.subServices?.forEach((sub) => {
    if (sub.slug === AREAS_SEGMENT) {
      throw new Error(
        `Sub-service slug "${AREAS_SEGMENT}" is reserved (in "${service.slug}"). Rename it.`
      )
    }
  })
})

export const getServiceHref = (slug: string): string => `/services/${slug}`

export const getSubServiceHref = (serviceSlug: string, subSlug: string) =>
  `/services/${serviceSlug}/${subSlug}`

export const getServiceAreaHref = (serviceSlug: string, areaSlug: string) =>
  `/services/${serviceSlug}/${AREAS_SEGMENT}/${areaSlug}`

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

/** Sub-services that have their own page (a `detail` block). */
export const getDetailedSubServices = (service: ServiceCategory) =>
  (service.subServices ?? []).filter((sub) => sub.detail !== undefined)

/** A category + sub-service pair, only if that sub-service has a page. */
export const getSubServicePage = (serviceSlug: string, subSlug: string) => {
  const service = getServiceCategory(serviceSlug)
  const sub = service
    ? getDetailedSubServices(service).find((item) => item.slug === subSlug)
    : undefined
  return service && sub?.detail
    ? { service, sub, detail: sub.detail }
    : undefined
}

/** Every service URL the site serves — feeds the sitemap and the 404 proxy. */
export const getAllServicePaths = (): string[] => [
  '/services',
  ...SERVICE_CATEGORIES.flatMap((service) => [
    getServiceHref(service.slug),
    ...getDetailedSubServices(service).map((sub) =>
      getSubServiceHref(service.slug, sub.slug)
    ),
    ...AREAS.map((area) => getServiceAreaHref(service.slug, area.slug)),
  ]),
]

/**
 * Cache Components requires generateStaticParams to return at least one
 * entry. When content yields none (e.g. no areas yet), this placeholder
 * keeps the build green and simply renders the not-found page.
 */
export const EMPTY_PARAM = '__none__'
