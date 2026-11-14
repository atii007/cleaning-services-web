import type { MetadataRoute } from 'next'

import { getServiceHref, SERVICE_CATEGORIES } from '@/content/services'
import { absoluteUrl } from '@/lib/seo'

/** Derived from content, so new services appear automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    {
      url: absoluteUrl('/services'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...SERVICE_CATEGORIES.map((service) => ({
      url: absoluteUrl(getServiceHref(service.slug)),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
