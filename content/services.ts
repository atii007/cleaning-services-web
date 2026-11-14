import type { ServiceCategory } from '@/types/content'

/**
 * Top-level service categories — PLACEHOLDER CONTENT.
 * Sub-services, FAQs and area pages will be added in Phase 3–4.
 */
export const SERVICE_CATEGORIES = [
  {
    slug: 'deep-cleaning',
    title: 'Deep Cleaning',
    summary:
      'Top-to-bottom cleaning for apartments, villas, kitchens and commercial spaces using eco-friendly products and steam sanitisation.',
    icon: 'sparkles',
  },
  {
    slug: 'maid-services',
    title: 'Maid Services',
    summary:
      'Trained, vetted housemaids by the hour, day or month — flexible plans that fit your schedule.',
    icon: 'house',
  },
  {
    slug: 'pest-control',
    title: 'Pest Control',
    summary:
      'Licensed treatments for cockroaches, bed bugs, rodents and more, with safe products and follow-up visits.',
    icon: 'shield',
  },
] as const satisfies readonly ServiceCategory[]
