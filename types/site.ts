export type NavItem = {
  label: string
  href: string
  children?: NavItem[]
}

export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'youtube'

export type SocialLink = {
  platform: SocialPlatform
  href: string
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
  }
  socials: SocialLink[]
  mainNav: NavItem[]
  footerNav: {
    services: NavItem[]
    company: NavItem[]
    legal: NavItem[]
  }
}
