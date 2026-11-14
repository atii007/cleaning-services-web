import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CalendarIcon, ClockIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { getBlogHref } from '@/content/blog'
import { BLOG_PAGE } from '@/content/blog-page'
import { formatDate } from '@/lib/format'
import type { BlogPostSummary } from '@/types/content'

type BlogPostCardProps = {
  post: BlogPostSummary
  /** Heading level that fits the surrounding outline. */
  headingLevel?: 'h2' | 'h3'
}

/** Article teaser card; the whole card is one link to the post. */
export const BlogPostCard = ({
  post,
  headingLevel: Heading = 'h3',
}: BlogPostCardProps) => (
  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-xl hover:shadow-heading/5">
    <div className="relative aspect-video overflow-hidden">
      <Image
        src={post.image.src}
        alt={post.image.alt}
        fill
        sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <Badge className="absolute start-4 top-4 bg-background/90 text-heading">
        {post.category}
      </Badge>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <p className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarIcon className="size-3.5" aria-hidden />
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon className="size-3.5" aria-hidden />
          {BLOG_PAGE.readTime(post.readMinutes)}
        </span>
      </p>
      <Heading className="mt-3 text-lg font-bold">
        <Link
          href={getBlogHref(post.slug)}
          className="after:absolute after:inset-0 hover:text-primary"
        >
          {post.title}
        </Link>
      </Heading>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">
        {post.excerpt}
      </p>
      <span
        aria-hidden
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
      >
        {BLOG_PAGE.readMore}
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      </span>
    </div>
  </article>
)
