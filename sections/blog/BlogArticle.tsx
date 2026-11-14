import Link from 'next/link'
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserRoundIcon,
} from 'lucide-react'
import type * as React from 'react'

import { BlogPostCard } from '@/components/shared/BlogPostCard'
import { CtaBand } from '@/components/shared/CtaBand'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ServiceCategoryGrid } from '@/components/shared/ServiceCategoryGrid'
import { Badge } from '@/components/ui/badge'
import { getBlogHref, getRelatedPosts, toPostSummary } from '@/content/blog'
import { BLOG_ARTICLE, BLOG_PAGE } from '@/content/blog-page'
import { getServiceCategory } from '@/content/services'
import { formatDate } from '@/lib/format'
import { getArticleJsonLd, serializeJsonLd } from '@/lib/seo'
import { BlogBody } from '@/sections/blog/BlogBody'
import type { BlogPost } from '@/types/content'

const RELATED_POSTS = 3

const MetaItem = ({
  icon: IconComponent,
  children,
}: {
  icon: typeof CalendarIcon
  children: React.ReactNode
}) => (
  <span className="inline-flex items-center gap-1.5">
    <IconComponent className="size-4" aria-hidden />
    {children}
  </span>
)

/** A blog post: hero, body, related services and posts, CTA band. */
export const BlogArticle = ({ post }: { post: BlogPost }) => {
  const path = getBlogHref(post.slug)
  const relatedServices = (post.relatedServices ?? []).flatMap((slug) => {
    const service = getServiceCategory(slug)
    return service ? [service] : []
  })
  const relatedPosts = getRelatedPosts(post, RELATED_POSTS).map(toPostSummary)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(getArticleJsonLd(post, path)),
        }}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        image={post.image}
        breadcrumbs={[
          { label: BLOG_PAGE.title, href: '/blog' },
          { label: post.title, href: path },
        ]}
        actions={
          <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-overlay-foreground/85">
            <MetaItem icon={CalendarIcon}>
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </MetaItem>
            <MetaItem icon={ClockIcon}>
              {BLOG_PAGE.readTime(post.readMinutes)}
            </MetaItem>
            {post.author ? (
              <MetaItem icon={UserRoundIcon}>
                {BLOG_ARTICLE.by} {post.author.name}
                {post.author.role ? `, ${post.author.role}` : null}
              </MetaItem>
            ) : null}
          </p>
        }
      />

      <article className="section">
        <div className="container-page max-w-3xl">
          <BlogBody blocks={post.body} />

          <footer className="mt-12 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
            {post.tags && post.tags.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-heading">
                  {BLOG_ARTICLE.tags}:
                </span>
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Badge variant="secondary">{tag}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {post.updatedAt ? (
              <p className="text-sm text-muted-foreground">
                {BLOG_ARTICLE.updated}{' '}
                <time dateTime={post.updatedAt}>
                  {formatDate(post.updatedAt)}
                </time>
              </p>
            ) : null}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
            >
              <ArrowLeftIcon className="size-4 rtl:rotate-180" aria-hidden />
              {BLOG_ARTICLE.backToBlog}
            </Link>
          </footer>
        </div>
      </article>

      {relatedServices.length > 0 ? (
        <section
          className="bg-surface section"
          aria-labelledby="related-services-heading"
        >
          <div className="container-page">
            <SectionHeading
              id="related-services-heading"
              eyebrow={BLOG_ARTICLE.relatedServices.eyebrow}
              title={BLOG_ARTICLE.relatedServices.title}
            />
            <ServiceCategoryGrid services={relatedServices} className="mt-12" />
          </div>
        </section>
      ) : null}

      {relatedPosts.length > 0 ? (
        <section className="section" aria-labelledby="related-posts-heading">
          <div className="container-page">
            <SectionHeading
              id="related-posts-heading"
              eyebrow={BLOG_ARTICLE.relatedPosts.eyebrow}
              title={BLOG_ARTICLE.relatedPosts.title}
            />
            <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related, index) => (
                <li key={related.slug}>
                  <Reveal delay={index * 0.08} className="h-full">
                    <BlogPostCard post={related} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  )
}
