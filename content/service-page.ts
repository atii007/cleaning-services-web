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
  learnMore: 'Learn more',
  subService: {
    included: "What's included",
    related: (service: string) => `More ${service.toLowerCase()} services`,
  },
  area: {
    eyebrow: (area: string) => `Serving ${area}`,
    title: (service: string, area: string) => `${service} in ${area}`,
    description: (service: string, area: string) =>
      `Lorem ipsum dolor sit amet — trusted ${service.toLowerCase()} for homes and businesses in ${area}. Same-day slots, trained staff and WhatsApp booking.`,
    introTitle: (service: string, area: string) =>
      `Professional ${service.toLowerCase()} in ${area}`,
    intro: (service: string, area: string) => [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Our ${service.toLowerCase()} team covers every part of ${area}, from apartments to villas and offices.`,
      'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.',
    ],
    otherAreasTitle: (service: string) => `${service} in other areas`,
    metaDescription: (service: string, area: string) =>
      `${service} in ${area}: trained staff, eco-friendly products and fast WhatsApp booking.`,
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
