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
