import { PLACEHOLDER_IMAGES } from '@/content/images'
import type { HeroSlide, SectionCopy, Stat, TrustPoint } from '@/types/content'

/** Home page copy — PLACEHOLDER CONTENT. */

export const HERO_SLIDES = [
  {
    id: 'deep-cleaning',
    eyebrow: 'Deep cleaning · Same-day slots',
    title: 'Spotless spaces, every time.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Trained crews, eco-friendly products and steam sanitisation for homes and offices.',
    image: PLACEHOLDER_IMAGES.floorCleaning,
  },
  {
    id: 'maid-services',
    eyebrow: 'Maid services · Hourly to monthly',
    title: 'Vetted housemaids, on your schedule.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Flexible plans with the same trusted maid every visit.',
    image: PLACEHOLDER_IMAGES.livingRoom,
  },
  {
    id: 'pest-control',
    eyebrow: 'Pest control · Licensed & safe',
    title: 'Complete care for villas and offices.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Licensed pest treatments with follow-up visits included.',
    image: PLACEHOLDER_IMAGES.villa,
  },
] as const satisfies readonly HeroSlide[]

export const HERO_HIGHLIGHTS = [
  'Trained & vetted staff',
  'Eco-friendly products',
  'Available 24/7',
] as const

export const SERVICES_SECTION = {
  eyebrow: 'What we do',
  title: 'One trusted team for every space',
} as const satisfies SectionCopy

export const WHY_US_SECTION = {
  eyebrow: 'Why choose us',
  title: 'Cleaning you can count on, every single visit',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
} as const satisfies SectionCopy

export const WHY_US_IMAGE = PLACEHOLDER_IMAGES.commercialMopping

export const STATS = [
  { value: 12, suffix: '+', label: 'Years of experience' },
  { value: 8500, suffix: '+', label: 'Homes & offices cleaned' },
  { value: 4.9, suffix: '/5', label: 'Average customer rating', decimals: 1 },
  { value: 24, suffix: '/7', label: 'Booking & support' },
] as const satisfies readonly Stat[]

export const TRUST_POINTS = [
  {
    icon: 'shield',
    title: 'Vetted & insured',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: 'leaf',
    title: 'Eco-friendly products',
    description: 'Sed posuere consectetur est at lobortis aenean lacinia.',
  },
  {
    icon: 'clock',
    title: 'On time, every time',
    description: 'Cras mattis consectetur purus sit amet fermentum.',
  },
  {
    icon: 'thumbs-up',
    title: 'Satisfaction guaranteed',
    description: 'Maecenas faucibus mollis interdum donec ullamcorper.',
  },
] as const satisfies readonly TrustPoint[]

export const BEFORE_AFTER_SECTION = {
  eyebrow: 'Before & after',
  title: 'See the difference for yourself',
  description:
    'Drag the handle to compare. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
} as const satisfies SectionCopy

export const TESTIMONIALS_SECTION = {
  eyebrow: 'Testimonials',
  title: 'What our customers say',
} as const satisfies SectionCopy

export const CLIENTS_SECTION = {
  eyebrow: 'Our clients',
  title: 'Trusted by homes and businesses across the city',
} as const satisfies SectionCopy

export const BLOG_SECTION = {
  eyebrow: 'Latest news',
  title: 'Tips, guides and company news',
} as const satisfies SectionCopy
