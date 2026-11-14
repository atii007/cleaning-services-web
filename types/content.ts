export type ServiceIconName = 'sparkles' | 'house' | 'shield'

export type ImageAsset = {
  src: string
  alt: string
  width: number
  height: number
}

export type ServiceCategory = {
  slug: string
  title: string
  /** One-line teaser used in menus. */
  tagline: string
  summary: string
  icon: ServiceIconName
  image: ImageAsset
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

export type TrustPointIcon = 'shield' | 'leaf' | 'clock' | 'thumbs-up'

export type TrustPoint = {
  icon: TrustPointIcon
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

export type ClientLogoIcon =
  | 'building'
  | 'hotel'
  | 'hospital'
  | 'school'
  | 'store'
  | 'factory'
  | 'landmark'
  | 'warehouse'

export type ClientLogo = {
  name: string
  icon: ClientLogoIcon
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
