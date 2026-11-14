import { PLACEHOLDER_IMAGES } from '@/content/images'
import type {
  AboutCard,
  Benefit,
  ImageAsset,
  Milestone,
  SectionCopy,
  TeamMember,
} from '@/types/content'

/**
 * About page — PLACEHOLDER CONTENT. Every section below is optional: delete
 * an export's items (or set it to an empty array) and the section disappears.
 * Stats, trust points, certifications, testimonials and client logos are
 * reused from their own content files.
 */

export const ABOUT_HERO = {
  eyebrow: 'About us',
  title: 'A local team that treats your home like our own',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Trained, vetted cleaners serving homes and businesses since 2014.',
  image: PLACEHOLDER_IMAGES.commercialMopping,
  metaDescription:
    'Meet the team behind our cleaning, maid and pest control services: our story, values and certifications.',
} as const

export const ABOUT_STORY: {
  eyebrow: string
  title: string
  paragraphs: string[]
  image?: ImageAsset
} = {
  eyebrow: 'Our story',
  title: 'From one van to a city-wide team',
  paragraphs: [
    'We started in 2014 with one van, two cleaners and a simple promise: turn up on time, do the job properly and leave every home better than we found it.',
    'Word spread through neighbours and building managers. Today our trained team looks after apartments, villas, offices and clinics across the city, and most new customers still come from a friend’s recommendation.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
  ],
  image: PLACEHOLDER_IMAGES.gloves,
}

export const MISSION_VISION: AboutCard[] = [
  {
    icon: 'sparkles',
    title: 'Our mission',
    description:
      'To make professional cleaning simple to book, fairly priced and consistently excellent, for every home and business we serve.',
  },
  {
    icon: 'star',
    title: 'Our vision',
    description:
      'To be the most trusted name for cleaning and home care in the region, known for reliable people and responsible products.',
  },
]

export const VALUES_SECTION = {
  eyebrow: 'What we stand for',
  title: 'The values behind every visit',
} as const satisfies SectionCopy

export const VALUES: Benefit[] = [
  {
    icon: 'handshake',
    title: 'Care',
    description:
      'We treat every space as if it were our own, and every customer as a neighbour.',
  },
  {
    icon: 'shield',
    title: 'Trust',
    description:
      'Background-checked, insured staff and clear prices with no surprises.',
  },
  {
    icon: 'leaf',
    title: 'Responsibility',
    description:
      'Eco-friendly products and licensed disposal, safe for children and pets.',
  },
  {
    icon: 'users',
    title: 'Teamwork',
    description:
      'Ongoing training, fair pay and supervisors who check the work.',
  },
  {
    icon: 'clock',
    title: 'Reliability',
    description: 'On time, every time, with WhatsApp updates along the way.',
  },
  {
    icon: 'thumbs-up',
    title: 'Quality',
    description: 'Not happy with something? We come back and fix it, free.',
  },
]

export const STATS_SECTION = {
  eyebrow: 'In numbers',
  title: 'A decade of spotless results',
} as const satisfies SectionCopy

export const MILESTONES_SECTION = {
  eyebrow: 'Our journey',
  title: 'Milestones along the way',
} as const satisfies SectionCopy

export const MILESTONES: Milestone[] = [
  {
    year: '2014',
    title: 'The first van',
    description: 'Two cleaners, one van and our first twenty regular homes.',
  },
  {
    year: '2017',
    title: 'Pest control added',
    description: 'Licensed by the public health authority for pest control.',
  },
  {
    year: '2020',
    title: 'Monthly maid plans',
    description: 'Flexible housekeeping plans for busy families.',
  },
  {
    year: '2023',
    title: 'ISO certified',
    description: 'ISO 9001, 14001 and 45001 certification across operations.',
  },
  {
    year: '2026',
    title: 'Citywide coverage',
    description: 'More than 30 areas served by a team of trained staff.',
  },
]

export const TEAM_SECTION = {
  eyebrow: 'Our people',
  title: 'Meet the team',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. The people who make every visit count.',
} as const satisfies SectionCopy

/** Leave `image` out to show initials instead of a photo. */
export const TEAM: TeamMember[] = [
  { name: 'Omar K.', role: 'Founder & managing director' },
  { name: 'Amina R.', role: 'Operations lead' },
  { name: 'Joseph D.', role: 'Pest control supervisor' },
  { name: 'Maria L.', role: 'Customer care manager' },
]

export const CERTIFICATIONS_SECTION = {
  eyebrow: 'Licensed & certified',
  title: 'Standards you can check',
  description:
    'Our certifications and licences are renewed every year and available on request.',
} as const satisfies SectionCopy
