import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CalendarIcon, ClockIcon } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getBlogHref, getLatestPosts } from '@/content/blog'
import { BLOG_SECTION } from '@/content/home'

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export const LatestPosts = () => (
  <section className="bg-surface section" aria-labelledby="blog-heading">
    <div className="container-page">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="blog-heading"
          eyebrow={BLOG_SECTION.eyebrow}
          title={BLOG_SECTION.title}
          align="start"
        />
        <Button asChild variant="outline" size="lg" className="h-11 px-5">
          <Link href="/blog">
            View all posts
            <ArrowRightIcon className="rtl:rotate-180" aria-hidden />
          </Link>
        </Button>
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getLatestPosts(3).map((post, index) => (
          <li key={post.slug}>
            <Reveal delay={index * 0.1} className="h-full">
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
                        {DATE_FORMAT.format(new Date(post.publishedAt))}
                      </time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon className="size-3.5" aria-hidden />
                      {post.readMinutes} min read
                    </span>
                  </p>
                  <h3 className="mt-3 text-lg font-bold">
                    <Link
                      href={getBlogHref(post.slug)}
                      className="after:absolute after:inset-0 hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span
                    aria-hidden
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Read article
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
