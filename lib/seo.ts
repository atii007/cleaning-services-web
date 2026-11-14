import { SITE_CONFIG } from '@/content/site'
import { env } from '@/lib/env'

export const absoluteUrl = (path = '/'): string =>
  new URL(path, env.NEXT_PUBLIC_SITE_URL).toString()

/** schema.org LocalBusiness JSON-LD for the root layout. */
export const getLocalBusinessJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'HouseCleaningService',
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: absoluteUrl('/'),
  email: SITE_CONFIG.contact.email,
  telephone: SITE_CONFIG.contact.phones[0]?.tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.contact.address.street,
    addressLocality: SITE_CONFIG.contact.address.locality,
    addressRegion: SITE_CONFIG.contact.address.region,
    addressCountry: SITE_CONFIG.contact.address.country,
  },
  openingHours: 'Mo-Su 00:00-23:59',
  sameAs: SITE_CONFIG.socials.map((social) => social.href),
})

/**
 * Serialises JSON-LD safely for a <script> tag (escapes `<` so content can
 * never close the script element).
 */
export const serializeJsonLd = (data: unknown): string =>
  JSON.stringify(data).replace(/</g, '\\u003c')

/** schema.org BreadcrumbList JSON-LD for a breadcrumb trail. */
export const getBreadcrumbJsonLd = (
  trail: readonly { label: string; href: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: absoluteUrl(item.href),
  })),
})
