import { PLACEHOLDER_IMAGES } from '@/content/images'
import type { ServiceCategory } from '@/types/content'

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.'
const LOREM_LONG =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla.'

/** Deep cleaning — PLACEHOLDER CONTENT (dummy services and prices). */
export const DEEP_CLEANING: ServiceCategory = {
  slug: 'deep-cleaning',
  title: 'Deep Cleaning',
  tagline: 'Villas, apartments, kitchens and offices',
  summary:
    'Top-to-bottom cleaning for apartments, villas, kitchens and commercial spaces using eco-friendly products and steam sanitisation.',
  icon: 'sparkles',
  image: PLACEHOLDER_IMAGES.windowCleaning,
  hero: {
    eyebrow: 'Same-day slots available',
    description: LOREM,
  },
  intro: {
    title: 'Professional deep cleaning for homes and businesses',
    paragraphs: [LOREM_LONG, LOREM],
    bullets: [
      'Trained, uniformed cleaning crews',
      'Eco-friendly, family-safe products',
      'Steam sanitisation for kitchens and bathrooms',
      'All equipment and supplies included',
      'One-off, move-in / move-out and contract cleans',
    ],
    image: PLACEHOLDER_IMAGES.floorCleaning,
  },
  subServices: [
    {
      slug: 'villa-deep-cleaning',
      title: 'Villa Deep Cleaning',
      summary: LOREM,
      icon: 'house',
      priceFrom: 180,
    },
    {
      slug: 'apartment-deep-cleaning',
      title: 'Apartment Deep Cleaning',
      summary: LOREM,
      icon: 'building',
      priceFrom: 120,
    },
    {
      slug: 'kitchen-deep-cleaning',
      title: 'Kitchen Deep Cleaning',
      summary: LOREM,
      icon: 'cooking-pot',
      priceFrom: 80,
    },
    {
      slug: 'bathroom-deep-cleaning',
      title: 'Bathroom Deep Cleaning',
      summary: LOREM,
      icon: 'bath',
      priceFrom: 50,
    },
    {
      slug: 'sofa-carpet-cleaning',
      title: 'Sofa & Carpet Shampooing',
      summary: LOREM,
      icon: 'sofa',
      priceFrom: 60,
    },
    {
      slug: 'ac-duct-cleaning',
      title: 'AC Duct Cleaning',
      summary: LOREM,
      icon: 'air-vent',
      priceFrom: 90,
    },
  ],
  blocks: [
    {
      title: 'Move-in and move-out cleaning',
      paragraphs: [LOREM_LONG],
      bullets: [
        'Inside cupboards, wardrobes and appliances',
        'Wall spot-cleaning and skirting boards',
        'Balcony and window tracks',
      ],
      image: PLACEHOLDER_IMAGES.livingRoom,
    },
    {
      title: 'Commercial and office cleaning',
      paragraphs: [LOREM_LONG, LOREM],
      bullets: [
        'After-hours and weekend scheduling',
        'Desk, pantry and washroom sanitisation',
        'Flexible monthly contracts',
      ],
      image: PLACEHOLDER_IMAGES.commercialMopping,
    },
  ],
  plans: [
    { name: 'One-time', price: 120, unit: 'per visit', description: LOREM },
    {
      name: 'Monthly',
      price: 99,
      unit: 'per visit',
      description: LOREM,
      popular: true,
    },
    { name: 'Annual', price: 89, unit: 'per visit', description: LOREM },
  ],
  planFeatures: [
    { label: 'Visits', values: ['1', '1 per month', '12 per year'] },
    { label: 'Eco-friendly products', values: [true, true, true] },
    { label: 'Steam sanitisation', values: [true, true, true] },
    { label: 'Inside appliances', values: [false, true, true] },
    {
      label: 'Free re-clean guarantee',
      values: ['24 hours', '48 hours', '72 hours'],
    },
    { label: 'Priority booking', values: [false, true, true] },
    { label: 'Dedicated supervisor', values: [false, false, true] },
  ],
  benefits: [
    { icon: 'user-check', title: 'Vetted professionals', description: LOREM },
    { icon: 'leaf', title: 'Eco-friendly products', description: LOREM },
    { icon: 'clock', title: 'On-time arrival', description: LOREM },
    { icon: 'shield', title: 'Insured work', description: LOREM },
  ],
  faqs: [
    { question: 'How long does a deep clean take?', answer: LOREM_LONG },
    { question: 'Do I need to provide supplies or equipment?', answer: LOREM },
    {
      question: 'Are your products safe for children and pets?',
      answer: LOREM,
    },
    { question: 'Can I book a same-day clean?', answer: LOREM_LONG },
    { question: 'What if I am not happy with the result?', answer: LOREM },
    { question: 'Do you clean offices outside working hours?', answer: LOREM },
  ],
}
