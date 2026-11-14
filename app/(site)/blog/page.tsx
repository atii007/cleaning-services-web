import type { Metadata } from 'next'

import { CtaBand } from '@/components/shared/CtaBand'
import { PageHero } from '@/components/shared/PageHero'
import { BLOG_PAGE } from '@/content/blog-page'
import { BlogIndex } from '@/sections/blog/BlogIndex'

export const metadata: Metadata = {
  title: BLOG_PAGE.title,
  description: BLOG_PAGE.metaDescription,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: BLOG_PAGE.title,
    description: BLOG_PAGE.metaDescription,
    url: '/blog',
    images: [{ url: BLOG_PAGE.image.src, alt: BLOG_PAGE.image.alt }],
  },
}

export default function BlogRoute() {
  return (
    <>
      <PageHero
        eyebrow={BLOG_PAGE.eyebrow}
        title={BLOG_PAGE.title}
        description={BLOG_PAGE.description}
        image={BLOG_PAGE.image}
        breadcrumbs={[{ label: BLOG_PAGE.title, href: '/blog' }]}
      />
      <BlogIndex />
      <CtaBand />
    </>
  )
}
