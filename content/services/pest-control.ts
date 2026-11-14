import { PLACEHOLDER_IMAGES } from '@/content/images'
import type { ServiceCategory } from '@/types/content'

const LOREM =
  'Donec ullamcorper nulla non metus auctor fringilla. Maecenas sed diam eget risus varius blandit sit amet non magna.'
const LOREM_LONG =
  'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.'

/** Pest control — PLACEHOLDER CONTENT (dummy services and prices). */
export const PEST_CONTROL: ServiceCategory = {
  slug: 'pest-control',
  title: 'Pest Control',
  tagline: 'Cockroaches, bed bugs, rodents and more',
  summary:
    'Licensed treatments for cockroaches, bed bugs, rodents and more, with safe products and follow-up visits.',
  icon: 'shield',
  image: PLACEHOLDER_IMAGES.gloves,
  hero: {
    eyebrow: 'Licensed & safe',
    description: LOREM,
  },
  intro: {
    title: 'Licensed pest control for homes and businesses',
    paragraphs: [LOREM_LONG, LOREM],
    bullets: [
      'Free inspection and treatment plan',
      'Approved, low-odour products',
      'Residential and commercial coverage',
      'Gel, spray, fogging and fumigation',
      'Follow-up visits included',
    ],
    image: PLACEHOLDER_IMAGES.sprayBottle,
  },
  subServices: [
    {
      slug: 'general-pest-control',
      title: 'General Pest Control',
      summary: LOREM,
      icon: 'spray-can',
      priceFrom: 45,
    },
    {
      slug: 'cockroach-control',
      title: 'Cockroach Control',
      summary: LOREM,
      icon: 'bug',
      priceFrom: 40,
      detail: {
        description: [LOREM_LONG, LOREM],
        included: [
          'Gel baiting in kitchens and bathrooms',
          'Crack and crevice spraying',
          'Drain treatment',
          '30-day warranty',
        ],
        image: PLACEHOLDER_IMAGES.sprayBottle,
      },
    },
    {
      slug: 'bed-bug-treatment',
      title: 'Bed Bug Treatment',
      summary: LOREM,
      icon: 'bed',
      priceFrom: 75,
      detail: {
        description: [LOREM_LONG, LOREM],
        included: [
          'Mattress, bed frame and furniture inspection',
          'Targeted heat or spray treatment',
          'Follow-up visit after 14 days',
          'Prevention advice',
        ],
        image: PLACEHOLDER_IMAGES.bedroom,
        faqs: [
          { question: 'How long does it take?', answer: LOREM },
          { question: 'What do I need to prepare?', answer: LOREM_LONG },
          { question: 'Is it safe for children and pets?', answer: LOREM },
        ],
      },
    },
    {
      slug: 'rodent-control',
      title: 'Rodent Control',
      summary: LOREM,
      icon: 'rat',
      priceFrom: 60,
    },
    {
      slug: 'mosquito-fly-control',
      title: 'Mosquito & Fly Control',
      summary: LOREM,
      icon: 'wind',
      priceFrom: 50,
    },
    {
      slug: 'fumigation',
      title: 'Fumigation',
      summary: LOREM,
      icon: 'flask',
      priceFrom: 120,
    },
    {
      slug: 'termite-control',
      title: 'Termite Control',
      summary: LOREM,
      icon: 'microscope',
      priceFrom: 150,
      detail: {
        description: [LOREM_LONG, LOREM],
        included: [
          'Full property inspection',
          'Soil and wood treatment',
          'Bait station installation',
          '12-month warranty',
        ],
      },
    },
    {
      slug: 'pest-control-contracts',
      title: 'Pest Control Contracts',
      summary: LOREM,
      icon: 'briefcase',
      priceFrom: 200,
    },
  ],
  blocks: [
    {
      title: 'Residential and commercial treatments',
      paragraphs: [LOREM_LONG],
      bullets: [
        'Villas, apartments and compounds',
        'Restaurants, warehouses and offices',
        'Preventive monthly programmes',
      ],
      image: PLACEHOLDER_IMAGES.minimalBathroom,
    },
    {
      title: 'Emergency pest response',
      paragraphs: [LOREM_LONG, LOREM],
      bullets: [
        'Rapid response, 24/7',
        'Certified technicians',
        'Safe for children and pets after drying',
      ],
      image: PLACEHOLDER_IMAGES.villa,
    },
  ],
  plans: [
    { name: 'Single treatment', price: 45, unit: 'per visit' },
    { name: 'Quarterly', price: 150, unit: 'per year', popular: true },
    { name: 'Monthly contract', price: 400, unit: 'per year' },
  ],
  planFeatures: [
    { label: 'Treatments', values: ['1', '4 per year', '12 per year'] },
    { label: 'Free inspection', values: [true, true, true] },
    { label: 'Follow-up visit', values: ['1', 'Unlimited', 'Unlimited'] },
    { label: 'Warranty', values: ['30 days', '90 days', '12 months'] },
    { label: 'Emergency call-outs', values: [false, false, true] },
    { label: 'Compliance certificate', values: [false, true, true] },
  ],
  benefits: [
    { icon: 'badge', title: 'Licensed technicians', description: LOREM },
    { icon: 'leaf', title: 'Safe products', description: LOREM },
    { icon: 'siren', title: '24/7 emergency response', description: LOREM },
    { icon: 'shield', title: 'Warranty on every job', description: LOREM },
    { icon: 'microscope', title: 'Free inspection', description: LOREM },
    { icon: 'calendar', title: 'Preventive programmes', description: LOREM },
  ],
  faqs: [
    {
      question: 'Is the treatment safe for children and pets?',
      answer: LOREM_LONG,
    },
    { question: 'Do I need to leave my home during treatment?', answer: LOREM },
    { question: 'How many visits will I need?', answer: LOREM },
    { question: 'Do you offer a warranty?', answer: LOREM_LONG },
    { question: 'What is included in a pest control contract?', answer: LOREM },
    { question: 'Can you treat commercial kitchens?', answer: LOREM },
    { question: 'How soon can a technician arrive?', answer: LOREM },
  ],
}
