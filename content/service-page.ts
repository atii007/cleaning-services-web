import { PLACEHOLDER_IMAGES } from '@/content/images'

/**
 * Copy for the service templates — PLACEHOLDER CONTENT. Headings take the
 * category title, so they work for any service without editing this file.
 */
export const SERVICE_PAGE_COPY = {
  breadcrumbLabel: 'Services',
  startingFrom: 'From',
  subServices: {
    eyebrow: 'What we offer',
    title: (service: string) => `Our ${service.toLowerCase()} services`,
    book: 'Book now',
  },
  plans: {
    eyebrow: 'Plans & pricing',
    title: 'Choose the plan that suits you',
    caption: (service: string) => `${service} plans compared`,
    feature: 'Feature',
    popular: 'Most popular',
    included: 'Included',
    notIncluded: 'Not included',
    cta: 'Choose plan',
    note: 'Prices are indicative. Final quotes depend on property size and condition.',
  },
  benefits: {
    eyebrow: 'Why choose us',
    title: (service: string) =>
      `Why customers trust our ${service.toLowerCase()}`,
  },
  faqs: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    description:
      'Can’t find your answer? Message us on WhatsApp and we’ll reply in minutes.',
  },
  areas: {
    eyebrow: 'Coverage',
    title: (service: string) => `${service} across the city`,
    description: (count: number) => `We currently serve ${count} areas.`,
  },
  enquiryTitle: (service: string) =>
    `Book ${service.toLowerCase()} — we reply on WhatsApp in minutes`,
} as const

export const SERVICES_INDEX = {
  title: 'Our services',
  eyebrow: 'What we do',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. One trusted team for cleaning, housekeeping and pest control.',
  image: PLACEHOLDER_IMAGES.livingRoom,
  metaDescription:
    'Explore our cleaning, maid and pest control services — trained staff, eco-friendly products and WhatsApp booking.',
} as const
