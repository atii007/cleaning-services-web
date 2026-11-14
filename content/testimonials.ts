import type { Testimonial } from '@/types/content'

/**
 * Customer reviews — PLACEHOLDER CONTENT. Replace with real, attributable
 * reviews before adding any rating structured data.
 */
export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Sara M.',
    area: 'Al Reem Island',
    service: 'Deep Cleaning',
    rating: 5,
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper, cras mattis consectetur purus.',
  },
  {
    id: 't2',
    name: 'Omar K.',
    area: 'Khalifa City',
    service: 'Pest Control',
    rating: 5,
    quote:
      'Donec ullamcorper nulla non metus auctor fringilla. Maecenas sed diam eget risus varius blandit sit amet non magna.',
  },
  {
    id: 't3',
    name: 'Priya R.',
    area: 'Al Raha',
    service: 'Maid Services',
    rating: 5,
    quote:
      'Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes.',
  },
  {
    id: 't4',
    name: 'James T.',
    area: 'Saadiyat',
    service: 'Deep Cleaning',
    rating: 4,
    quote:
      'Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
  },
  {
    id: 't5',
    name: 'Fatima A.',
    area: 'Downtown',
    service: 'Maid Services',
    rating: 5,
    quote:
      'Etiam porta sem malesuada magna mollis euismod. Curabitur blandit tempus porttitor, nulla vitae elit libero a pharetra.',
  },
  {
    id: 't6',
    name: 'Daniel P.',
    area: 'Mussafah',
    service: 'Pest Control',
    rating: 5,
    quote:
      'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
  },
] as const satisfies readonly Testimonial[]
