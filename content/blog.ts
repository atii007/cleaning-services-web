import { PLACEHOLDER_IMAGES } from '@/content/images'
import type { BlogPost } from '@/types/content'

/** Blog posts — PLACEHOLDER CONTENT. Full articles arrive in Phase 5. */
export const BLOG_POSTS = [
  {
    slug: 'summer-villa-cleaning-checklist',
    title: 'The summer villa cleaning checklist',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus.',
    publishedAt: '2026-10-28',
    readMinutes: 6,
    category: 'Guides',
    image: PLACEHOLDER_IMAGES.villaPool,
  },
  {
    slug: 'house-plants-and-dust',
    title: 'Do house plants really reduce dust?',
    excerpt:
      'Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum.',
    publishedAt: '2026-10-14',
    readMinutes: 4,
    category: 'Tips',
    image: PLACEHOLDER_IMAGES.plantsLounge,
  },
  {
    slug: 'robot-vacuum-vs-deep-clean',
    title: 'Robot vacuum vs. a professional deep clean',
    excerpt:
      'Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla.',
    publishedAt: '2026-09-30',
    readMinutes: 5,
    category: 'Guides',
    image: PLACEHOLDER_IMAGES.robotVacuum,
  },
  {
    slug: 'bathroom-limescale',
    title: 'Beating limescale in hard-water bathrooms',
    excerpt:
      'Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur.',
    publishedAt: '2026-09-12',
    readMinutes: 3,
    category: 'Tips',
    image: PLACEHOLDER_IMAGES.minimalBathroom,
  },
  {
    slug: 'monthly-maid-plans',
    title: 'Introducing flexible monthly maid plans',
    excerpt:
      'Etiam porta sem malesuada magna mollis euismod. Curabitur blandit tempus porttitor.',
    publishedAt: '2026-08-25',
    readMinutes: 2,
    category: 'News',
    image: PLACEHOLDER_IMAGES.familyLounge,
  },
  {
    slug: 'eco-friendly-products',
    title: 'Why we switched to eco-friendly products',
    excerpt:
      'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.',
    publishedAt: '2026-08-04',
    readMinutes: 4,
    category: 'News',
    image: PLACEHOLDER_IMAGES.yellowChair,
  },
] as const satisfies readonly BlogPost[]

export const getBlogHref = (slug: string): string => `/blog/${slug}`

/** Newest first. ISO dates sort correctly as strings. */
export const getLatestPosts = (count: number) =>
  [...BLOG_POSTS]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, count)
