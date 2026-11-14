import type { SiteConfig } from '@/types/site'

/**
 * Global site configuration — PLACEHOLDER CONTENT.
 * Replace with real business details once branding is finalised.
 */
export const SITE_CONFIG = {
  name: 'Sparkle Pro Cleaning',
  shortName: 'Sparkle Pro',
  tagline: 'Spotless spaces, every time.',
  description:
    'Professional deep cleaning, maid services and pest control for homes and businesses. Trained staff, eco-friendly products, available 24/7.',
  locale: 'en_US',
  contact: {
    phones: [
      { label: 'Toll free', display: '800 000 000', tel: '+800000000' },
      { label: 'Mobile', display: '+971 50 000 0000', tel: '+971500000000' },
    ],
    email: 'hello@example.com',
    whatsapp: '971500000000',
    address: {
      street: 'Office 000, Example Tower',
      locality: 'Abu Dhabi',
      region: 'Abu Dhabi',
      country: 'AE',
    },
    hours: 'Open 24/7',
  },
  socials: [
    { platform: 'facebook', href: 'https://facebook.com' },
    { platform: 'instagram', href: 'https://instagram.com' },
    { platform: 'linkedin', href: 'https://linkedin.com' },
    { platform: 'youtube', href: 'https://youtube.com' },
  ],
  mainNav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Services',
      href: '/services',
      children: [
        { label: 'Deep Cleaning', href: '/services/deep-cleaning' },
        { label: 'Maid Services', href: '/services/maid-services' },
        { label: 'Pest Control', href: '/services/pest-control' },
      ],
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  footerNav: {
    services: [
      { label: 'Deep Cleaning', href: '/services/deep-cleaning' },
      { label: 'Maid Services', href: '/services/maid-services' },
      { label: 'Pest Control', href: '/services/pest-control' },
    ],
    company: [
      { label: 'About us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
} as const satisfies SiteConfig
