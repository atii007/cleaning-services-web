import { NewspaperIcon } from 'lucide-react'

import {
  getBlogCategories,
  getSortedPosts,
  toPostSummary,
} from '@/content/blog'
import { BLOG_PAGE } from '@/content/blog-page'
import { BlogGrid } from '@/sections/blog/BlogGrid'

/** All posts, newest first, with a category filter. */
export const BlogIndex = () => {
  const posts = getSortedPosts().map(toPostSummary)

  return (
    <section className="section" aria-label={BLOG_PAGE.title}>
      <div className="container-page">
        {posts.length > 0 ? (
          <BlogGrid posts={posts} categories={getBlogCategories()} />
        ) : (
          <p className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
            <NewspaperIcon className="size-10 text-primary" aria-hidden />
            {BLOG_PAGE.empty}
          </p>
        )}
      </div>
    </section>
  )
}
