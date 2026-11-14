import { PLACEHOLDER_IMAGES } from '@/content/images'
import type { ServiceCategory } from '@/types/content'

const LOREM =
  'Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes.'
const LOREM_LONG =
  'Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna mollis euismod. Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor, nulla vitae elit libero.'

/** Maid services — PLACEHOLDER CONTENT (dummy services and prices). */
export const MAID_SERVICES: ServiceCategory = {
  slug: 'maid-services',
  title: 'Maid Services',
  tagline: 'Hourly, daily and monthly housemaids',
  summary:
    'Trained, vetted housemaids by the hour, day or month — flexible plans that fit your schedule.',
  icon: 'house',
  image: PLACEHOLDER_IMAGES.vacuuming,
  hero: {
    eyebrow: 'Hourly to monthly',
    description: LOREM,
  },
  intro: {
    title: 'Reliable housemaids, on your schedule',
    paragraphs: [LOREM_LONG, LOREM],
    bullets: [
      'Background-checked, trained maids',
      'The same maid on every visit',
      'Hourly, part-time and live-out plans',
      'Cleaning supplies available on request',
    ],
    image: PLACEHOLDER_IMAGES.familyLounge,
  },
  subServices: [
    {
      slug: 'hourly-maid',
      title: 'Hourly Maid',
      summary: LOREM,
      icon: 'timer',
      priceFrom: 9,
    },
    {
      slug: 'part-time-maid',
      title: 'Part-time Maid',
      summary: LOREM,
      icon: 'calendar-clock',
      priceFrom: 150,
    },
    {
      slug: 'monthly-maid',
      title: 'Monthly Maid',
      summary: LOREM,
      icon: 'calendar',
      priceFrom: 450,
    },
    {
      slug: 'babysitting',
      title: 'Babysitting',
      summary: LOREM,
      icon: 'baby',
      priceFrom: 12,
    },
    {
      slug: 'ironing-laundry',
      title: 'Ironing & Laundry',
      summary: LOREM,
      icon: 'shirt',
      priceFrom: 10,
    },
  ],
  blocks: [
    {
      title: 'Flexible plans for busy families',
      paragraphs: [LOREM_LONG],
      bullets: [
        'Pause or reschedule any visit',
        'Weekday, weekend and evening slots',
        'Simple monthly billing',
      ],
      image: PLACEHOLDER_IMAGES.bedroom,
    },
  ],
  plans: [
    { name: 'Hourly', price: 9, unit: 'per hour' },
    { name: 'Weekly', price: 150, unit: 'per month', popular: true },
    { name: 'Monthly', price: 450, unit: 'per month' },
  ],
  planFeatures: [
    {
      label: 'Hours included',
      values: ['Minimum 4', '16 per month', '160 per month'],
    },
    { label: 'Same maid every visit', values: [false, true, true] },
    { label: 'Supplies included', values: [false, true, true] },
    { label: 'Free replacement', values: [false, true, true] },
    { label: 'Cancel anytime', values: [true, true, false] },
  ],
  benefits: [
    { icon: 'user-check', title: 'Vetted & trained', description: LOREM },
    { icon: 'handshake', title: 'Same trusted maid', description: LOREM },
    { icon: 'calendar', title: 'Flexible scheduling', description: LOREM },
    { icon: 'smile', title: 'Satisfaction guaranteed', description: LOREM },
  ],
  faqs: [
    { question: 'What is the minimum booking?', answer: LOREM },
    { question: 'Can I request the same maid each time?', answer: LOREM_LONG },
    { question: 'Are your maids background-checked?', answer: LOREM },
    { question: 'Can I change or cancel a booking?', answer: LOREM },
    { question: 'Do maids bring cleaning supplies?', answer: LOREM_LONG },
  ],
}
