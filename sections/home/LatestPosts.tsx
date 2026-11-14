import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import { BlogPostCard } from '@/components/shared/BlogPostCard'
import { Reveal } from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { getLatestPosts } from '@/content/blog'
import { BLOG_PAGE } from '@/content/blog-page'
import { BLOG_SECTION } from '@/content/home'

/** Home page teaser of the newest posts. Hidden when there are none. */
export const LatestPosts = () => {
  const posts = getLatestPosts(3)
  if (posts.length === 0) {
    return null
  }

  return (
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
              {BLOG_PAGE.viewAll}
              <ArrowRightIcon className="rtl:rotate-180" aria-hidden />
            </Link>
          </Button>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={index * 0.1} className="h-full">
                <BlogPostCard post={post} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
