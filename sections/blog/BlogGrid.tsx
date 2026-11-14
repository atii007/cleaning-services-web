'use client'

import * as React from 'react'
import { cn } from 'cn'

import { BlogPostCard } from '@/components/shared/BlogPostCard'
import { Reveal } from '@/components/shared/Reveal'
import { BLOG_PAGE } from '@/content/blog-page'
import type { BlogPostSummary } from '@/types/content'

const ALL = 'all'

type BlogGridProps = {
  posts: BlogPostSummary[]
  categories: string[]
}

/**
 * Category chips + post grid. Every post is rendered on the server (the
 * default "All" view), so crawlers see the full list; chips filter in place.
 */
export const BlogGrid = ({ posts, categories }: BlogGridProps) => {
  const [filter, setFilter] = React.useState(ALL)

  const visible =
    filter === ALL ? posts : posts.filter((post) => post.category === filter)

  const options = [
    { value: ALL, label: BLOG_PAGE.allCategories },
    ...categories.map((category) => ({ value: category, label: category })),
  ]

  return (
    <div>
      {categories.length > 1 ? (
        <div
          role="group"
          aria-label={BLOG_PAGE.filterLabel}
          className="flex flex-wrap justify-center gap-2"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={filter === option.value}
              onClick={() => setFilter(option.value)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                filter === option.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'bg-background hover:border-primary hover:text-primary'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}

      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, index) => (
          <li key={post.slug}>
            <Reveal delay={(index % 3) * 0.08} className="h-full">
              <BlogPostCard post={post} headingLevel="h2" />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
