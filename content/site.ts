import { PLACEHOLDER_IMAGES } from '@/content/images'
import { SERVICE_NAV_ITEMS } from '@/content/services'
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
    availability: 'Always online — book any time, day or night',
  },
  ctas: {
    quote: { label: 'Get a free quote', href: '/#contact' },
    call: 'Call us',
    whatsapp: 'WhatsApp us',
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
      children: SERVICE_NAV_ITEMS,
      featured: {
        title: 'Not sure what you need?',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tell us about your space.',
        image: PLACEHOLDER_IMAGES.bathroom,
        cta: { label: 'Get a free quote', href: '/#contact' },
      },
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  footerNav: {
    services: SERVICE_NAV_ITEMS,
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
  currency: { code: 'USD', locale: 'en-US' },
  certifications: [
    { name: 'ISO 9001', issuer: 'Quality management', icon: 'award' },
    { name: 'ISO 14001', issuer: 'Environmental management', icon: 'leaf' },
    { name: 'ISO 45001', issuer: 'Health & safety', icon: 'shield' },
    { name: 'Public Health', issuer: 'Pest control licence', icon: 'landmark' },
    { name: 'Waste Management', issuer: 'Licensed disposal', icon: 'recycle' },
    { name: 'ICV Certified', issuer: 'In-country value', icon: 'badge' },
  ],
} as const satisfies SiteConfig
