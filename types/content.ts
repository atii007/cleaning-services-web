import type { IconName } from '@/lib/icons'

export type { IconName }

export type ImageAsset = {
  src: string
  alt: string
  width: number
  height: number
}

export type SubService = {
  /** Reserved for the sub-service page route (Phase 4). */
  slug: string
  title: string
  summary: string
  icon: IconName
  /** Starting price, in the site currency. Omit to hide the price. */
  priceFrom?: number
}

export type ContentBlock = {
  title: string
  paragraphs: string[]
  bullets?: string[]
  image?: ImageAsset
}

export type ServicePlan = {
  name: string
  /** In the site currency. */
  price: number
  /** Free text shown after the price, e.g. "per visit" or "/month". */
  unit: string
  description?: string
  popular?: boolean
}

/**
 * One comparison row. `values` has one entry per plan, in plan order:
 * `true` = included, `false` = not included, string = short custom value.
 */
export type PlanFeature = {
  label: string
  values: (boolean | string)[]
}

export type Benefit = {
  icon: IconName
  title: string
  description: string
}

export type Faq = {
  question: string
  answer: string
}

/**
 * A service category: its card/nav summary plus its page. Every page
 * section is optional — the template renders only what is provided.
 */
export type ServiceCategory = {
  slug: string
  title: string
  /** One-line teaser used in menus. */
  tagline: string
  /** Card text on the home and /services pages. */
  summary: string
  icon: IconName
  image: ImageAsset
  /** Page-level SEO description; falls back to `summary`. */
  metaDescription?: string
  hero?: { eyebrow?: string; description: string }
  intro?: {
    title: string
    paragraphs: string[]
    bullets?: string[]
    image?: ImageAsset
  }
  subServices?: SubService[]
  blocks?: ContentBlock[]
  plans?: ServicePlan[]
  planFeatures?: PlanFeature[]
  benefits?: Benefit[]
  faqs?: Faq[]
}

export type CtaLink = {
  label: string
  href: string
}

export type PromoOffer = {
  /** Turn the popup off without removing the content. */
  enabled: boolean
  /** Change the id to show a new offer to visitors who dismissed the old one. */
  id: string
  eyebrow: string
  title: string
  description: string
  highlights: string[]
  image: ImageAsset
  cta: CtaLink
  /** Delay before the popup opens, in milliseconds. */
  delayMs: number
  /** Routes where the popup never opens. */
  excludedPaths: string[]
}

export type SectionCopy = {
  eyebrow: string
  title: string
  description?: string
}

export type HeroSlide = {
  id: string
  eyebrow: string
  title: string
  description: string
  image: ImageAsset
}

export type Stat = {
  value: number
  /** Appended after the number, e.g. "+" or "%". */
  suffix: string
  label: string
  /** Decimal places shown, e.g. 1 for a 4.9 rating. */
  decimals?: number
}

export type TrustPoint = {
  icon: IconName
  title: string
  description: string
}

export type BeforeAfterItem = {
  id: string
  title: string
  location: string
  /** Service category slug, used by the gallery filter. */
  service: string
  before: ImageAsset
  after: ImageAsset
}

export type Testimonial = {
  id: string
  name: string
  area: string
  service: string
  /** 1–5 */
  rating: number
  quote: string
}

export type ClientLogo = {
  name: string
  icon: IconName
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  /** ISO date, e.g. 2026-10-02 */
  publishedAt: string
  readMinutes: number
  category: string
  image: ImageAsset
}
