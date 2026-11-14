import type { MetadataRoute } from 'next'

import { getAllServicePaths } from '@/content/services'
import { absoluteUrl } from '@/lib/seo'

/** Derived from content, so new services, sub-services and areas appear automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    ...getAllServicePaths().map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: 'monthly' as const,
      // Deeper pages get slightly lower priority.
      priority: Math.max(0.5, 1 - path.split('/').length * 0.1),
    })),
  ]
}
