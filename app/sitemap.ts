import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/seo'

/** Extend with service, area and blog routes as they are built. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 }]
}
