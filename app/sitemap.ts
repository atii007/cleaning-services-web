import type { MetadataRoute } from 'next'

import { BLOG_POSTS, getBlogHref } from '@/content/blog'
import { getAllPolicyPaths } from '@/content/policies'
import { getAllServicePaths } from '@/content/services'
import { absoluteUrl } from '@/lib/seo'

/** Derived from content, so new services, posts and policies appear automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/about'), changeFrequency: 'yearly', priority: 0.7 },
    { url: absoluteUrl('/contact'), changeFrequency: 'yearly', priority: 0.8 },
    ...getAllServicePaths().map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: 'monthly' as const,
      // Deeper pages get slightly lower priority.
      priority: Math.max(0.5, 1 - path.split('/').length * 0.1),
    })),
    ...(BLOG_POSTS.length > 0
      ? [
          {
            url: absoluteUrl('/blog'),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          },
        ]
      : []),
    ...BLOG_POSTS.map((post) => ({
      url: absoluteUrl(getBlogHref(post.slug)),
      lastModified: post.updatedAt ?? post.publishedAt,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...getAllPolicyPaths().map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
