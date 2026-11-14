import { PLACEHOLDER_IMAGES } from '@/content/images'

/** Copy for the blog index and article pages — PLACEHOLDER CONTENT. */
export const BLOG_PAGE = {
  title: 'Blog',
  eyebrow: 'Tips, guides and news',
  description:
    'Practical cleaning advice, seasonal checklists and news from our team.',
  metaDescription:
    'Cleaning tips, seasonal checklists and company news from our team of professional cleaners.',
  image: PLACEHOLDER_IMAGES.bedroom,
  filterLabel: 'Filter posts by category',
  allCategories: 'All',
  readMore: 'Read article',
  readTime: (minutes: number) => `${minutes} min read`,
  empty: 'No articles yet. Check back soon.',
  viewAll: 'View all posts',
} as const

export const BLOG_ARTICLE = {
  by: 'By',
  updated: 'Updated',
  tags: 'Tags',
  relatedServices: {
    eyebrow: 'Need a hand?',
    title: 'Services related to this article',
  },
  relatedPosts: {
    eyebrow: 'Keep reading',
    title: 'More from the blog',
  },
  backToBlog: 'Back to all posts',
} as const
