import type { CtaLink, ImageAsset, ServiceIconName } from '@/types/content'

export type NavItem = {
  label: string
  href: string
  /** Short helper text shown in the desktop mega-menu. */
  description?: string
  icon?: ServiceIconName
  children?: NavItem[]
  /** Promo card shown beside the children in the desktop mega-menu. */
  featured?: NavFeature
}

export type NavFeature = {
  title: string
  description: string
  image: ImageAsset
  cta: CtaLink
}

export type BreadcrumbItem = {
  label: string
  href: string
}

export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'youtube'

export type SocialLink = {
  platform: SocialPlatform
  href: string
}

export type CertificationIcon =
  'award' | 'badge' | 'leaf' | 'shield' | 'recycle' | 'landmark'

export type Certification = {
  name: string
  issuer: string
  icon: CertificationIcon
}

export type SiteConfig = {
  name: string
  shortName: string
  tagline: string
  description: string
  locale: string
  contact: {
    phones: { label: string; display: string; tel: string }[]
    email: string
    /** International format, digits only — used to build wa.me links */
    whatsapp: string
    address: {
      street: string
      locality: string
      region: string
      country: string
    }
    hours: string
    /** Short availability note shown next to the hours. */
    availability: string
  }
  /** Labels for the call-to-action buttons used across the site. */
  ctas: {
    quote: CtaLink
    call: string
    whatsapp: string
  }
  socials: SocialLink[]
  mainNav: NavItem[]
  footerNav: {
    services: NavItem[]
    company: NavItem[]
    legal: NavItem[]
  }
  certifications: Certification[]
}
