import { PLACEHOLDER_IMAGES } from '@/content/images'
import type { BlogAuthor, BlogPost, BlogPostSummary } from '@/types/content'

/**
 * Blog posts — PLACEHOLDER CONTENT.
 *
 * Each post is a list of typed body blocks (heading, paragraph, list, image,
 * quote, callout), so articles need no code changes. Order here does not
 * matter: lists are always sorted newest first. See docs/CONTENT-GUIDE.md.
 */

const EDITORIAL: BlogAuthor = { name: 'Sparkle Pro Team', role: 'Editorial' }
const OPERATIONS: BlogAuthor = { name: 'Amina R.', role: 'Operations lead' }

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: 'summer-villa-cleaning-checklist',
    title: 'The summer villa cleaning checklist',
    excerpt:
      'Heat, dust and sand settle fast in summer. Here is the room-by-room checklist our teams follow before the hottest months.',
    publishedAt: '2026-10-28',
    readMinutes: 6,
    category: 'Guides',
    image: PLACEHOLDER_IMAGES.villaPool,
    author: OPERATIONS,
    tags: ['Villas', 'Seasonal', 'Checklist'],
    relatedServices: ['deep-cleaning', 'pest-control'],
    body: [
      {
        type: 'paragraph',
        text: 'Summer is when dust, sand and humidity work hardest against a home. Air conditioning runs all day, windows stay shut and outdoor areas collect fine sand within hours. A thorough clean before the heat peaks keeps the air fresher and saves a lot of effort later.',
      },
      { type: 'heading', text: 'Start with the air' },
      {
        type: 'paragraph',
        text: 'AC vents and filters circulate whatever they collect. Clean or replace filters, wipe the vent grilles and vacuum around indoor units before you touch anything else, so you are not re-dusting clean rooms afterwards.',
      },
      {
        type: 'list',
        items: [
          'Wash or replace AC filters',
          'Wipe vent grilles and ceiling fans',
          'Vacuum curtains and blinds',
          'Clean window tracks and door seals',
        ],
      },
      {
        type: 'image',
        image: PLACEHOLDER_IMAGES.livingRoom,
        caption: 'Living areas collect the most fine dust in summer.',
      },
      { type: 'heading', text: 'Outdoor areas and the pool' },
      {
        type: 'paragraph',
        text: 'Sweep terraces from the top down, rinse outdoor furniture and check drains for blockages. Around the pool, scrub the tile line and clear the skimmer baskets so debris does not settle in the water.',
      },
      {
        type: 'callout',
        title: 'Tip',
        text: 'Book a deep clean just before you travel. You come back to a fresh home, not three weeks of settled dust.',
      },
    ],
  },
  {
    slug: 'house-plants-and-dust',
    title: 'Do house plants really reduce dust?',
    excerpt:
      'Plants make a room feel fresher, but do they actually cut down on dust? We looked at what helps and what does not.',
    publishedAt: '2026-10-14',
    readMinutes: 4,
    category: 'Tips',
    image: PLACEHOLDER_IMAGES.plantsLounge,
    author: EDITORIAL,
    tags: ['Indoor air', 'Home tips'],
    relatedServices: ['maid-services'],
    body: [
      {
        type: 'paragraph',
        text: 'House plants are often recommended as a natural way to keep dust down. They can help a little, by raising humidity and trapping particles on their leaves, but they are not a replacement for regular cleaning.',
      },
      { type: 'heading', text: 'What plants can do' },
      {
        type: 'list',
        items: [
          'Raise humidity slightly, so dust settles instead of floating',
          'Catch some particles on broad leaves',
          'Make a room feel calmer and fresher',
        ],
      },
      { type: 'heading', text: 'What they cannot do' },
      {
        type: 'paragraph',
        text: 'Leaves that collect dust need wiping too, or they stop doing their job. Most household dust comes from fabrics, outdoor air and skin, and only regular vacuuming and wiping removes it.',
      },
      {
        type: 'quote',
        text: 'A weekly wipe of leaves and surfaces does more for indoor air than any single plant.',
        cite: 'Our housekeeping team',
      },
    ],
  },
  {
    slug: 'robot-vacuum-vs-deep-clean',
    title: 'Robot vacuum vs. a professional deep clean',
    excerpt:
      'Robot vacuums are great for daily upkeep. Here is where they shine, and where a professional deep clean still matters.',
    publishedAt: '2026-09-30',
    readMinutes: 5,
    category: 'Guides',
    image: PLACEHOLDER_IMAGES.robotVacuum,
    author: EDITORIAL,
    tags: ['Deep cleaning', 'Gadgets'],
    relatedServices: ['deep-cleaning'],
    body: [
      {
        type: 'paragraph',
        text: 'A robot vacuum keeps open floors tidy between cleans, and for many homes that is a real time saver. But floors are only one part of a clean home.',
      },
      { type: 'heading', text: 'Where robots do well' },
      {
        type: 'list',
        items: [
          'Daily crumbs and pet hair on open floors',
          'Keeping dust from building up under sofas and beds',
          'Running while you are out',
        ],
      },
      { type: 'heading', text: 'Where a deep clean is still needed' },
      {
        type: 'paragraph',
        text: 'Skirting boards, grout, kitchen grease, limescale, upholstery and high surfaces all need hands and the right products. A deep clean resets the whole home, so the robot only has to maintain it.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Book a deep clean to reset the home',
          'Let the robot handle daily floor upkeep',
          'Add a regular maid visit for surfaces and bathrooms',
        ],
      },
    ],
  },
  {
    slug: 'bathroom-limescale',
    title: 'Beating limescale in hard-water bathrooms',
    excerpt:
      'Hard water leaves white crusts on taps, glass and tiles. These simple habits keep limescale from coming back.',
    publishedAt: '2026-09-12',
    readMinutes: 3,
    category: 'Tips',
    image: PLACEHOLDER_IMAGES.minimalBathroom,
    author: OPERATIONS,
    tags: ['Bathrooms', 'Home tips'],
    relatedServices: ['deep-cleaning', 'maid-services'],
    body: [
      {
        type: 'paragraph',
        text: 'Limescale forms when hard water evaporates and leaves its minerals behind. The longer it sits, the harder it is to remove, so little and often works best.',
      },
      { type: 'heading', text: 'Three daily habits' },
      {
        type: 'list',
        items: [
          'Squeegee shower glass after every use',
          'Wipe taps dry with a microfibre cloth',
          'Leave the bathroom door open so surfaces dry quickly',
        ],
      },
      {
        type: 'callout',
        text: 'Avoid abrasive pads on chrome and glass. They scratch the surface, and limescale then grips even harder.',
      },
      {
        type: 'paragraph',
        text: 'For heavy build-up on shower heads, tiles and glass, a professional descale removes it safely without damaging the finish.',
      },
    ],
  },
  {
    slug: 'monthly-maid-plans',
    title: 'Introducing flexible monthly maid plans',
    excerpt:
      'Our new monthly plans let you choose the number of visits, the hours and the days that suit your week.',
    publishedAt: '2026-08-25',
    readMinutes: 2,
    category: 'News',
    image: PLACEHOLDER_IMAGES.familyLounge,
    author: EDITORIAL,
    tags: ['Company news', 'Maid services'],
    relatedServices: ['maid-services'],
    body: [
      {
        type: 'paragraph',
        text: 'Many customers asked for something between a one-off booking and a full-time housekeeper. Our monthly maid plans fill that gap.',
      },
      { type: 'heading', text: 'How the plans work' },
      {
        type: 'list',
        items: [
          'Choose weekly, twice-weekly or daily visits',
          'Keep the same trained maid where possible',
          'Pause or change your plan with a WhatsApp message',
        ],
      },
      {
        type: 'paragraph',
        text: 'Plans include all cleaning products and equipment. Message us on WhatsApp to get a quote for your home.',
      },
    ],
  },
  {
    slug: 'eco-friendly-products',
    title: 'Why we switched to eco-friendly products',
    excerpt:
      'We now use plant-based, low-fragrance products across every service. Here is why, and what changes for you.',
    publishedAt: '2026-08-04',
    readMinutes: 4,
    category: 'News',
    image: PLACEHOLDER_IMAGES.yellowChair,
    author: OPERATIONS,
    tags: ['Company news', 'Sustainability'],
    relatedServices: ['deep-cleaning', 'maid-services'],
    body: [
      {
        type: 'paragraph',
        text: 'Strong chemicals clean well, but they linger in the air and on surfaces long after we leave. Families with children, pets and allergies asked us for gentler options.',
      },
      { type: 'heading', text: 'What changed' },
      {
        type: 'list',
        items: [
          'Plant-based, biodegradable cleaning products',
          'Low-fragrance formulas for sensitive homes',
          'Refillable bottles to cut plastic waste',
        ],
      },
      {
        type: 'image',
        image: PLACEHOLDER_IMAGES.sprayBottle,
        caption: 'Refillable bottles are now standard on every visit.',
      },
      {
        type: 'quote',
        text: 'The results are the same. The home just smells like clean, not like chemicals.',
        cite: 'A long-time customer',
      },
    ],
  },
]

export const getBlogHref = (slug: string): string => `/blog/${slug}`

/** Every post, newest first. ISO dates sort correctly as strings. */
export const getSortedPosts = (): BlogPost[] =>
  [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

/** Strips the body so only card data is sent to client components. */
export const toPostSummary = ({
  body: _body,
  ...summary
}: BlogPost): BlogPostSummary => summary

export const getLatestPosts = (count: number): BlogPost[] =>
  getSortedPosts().slice(0, count)

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((post) => post.slug === slug)

/** Categories in first-use order (newest posts first), without duplicates. */
export const getBlogCategories = (): string[] => [
  ...new Set(getSortedPosts().map((post) => post.category)),
]

/** Other posts, same category first, then newest. */
export const getRelatedPosts = (post: BlogPost, count: number): BlogPost[] => {
  const others = getSortedPosts().filter((item) => item.slug !== post.slug)
  return [
    ...others.filter((item) => item.category === post.category),
    ...others.filter((item) => item.category !== post.category),
  ].slice(0, count)
}

/** Every blog URL — feeds the sitemap and the 404 proxy. */
export const getAllBlogPaths = (): string[] => [
  '/blog',
  ...BLOG_POSTS.map((post) => getBlogHref(post.slug)),
]
