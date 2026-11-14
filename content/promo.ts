import { PLACEHOLDER_IMAGES } from '@/content/images'
import type { PromoOffer } from '@/types/content'

/** Special-offer popup — PLACEHOLDER CONTENT. */
export const PROMO_OFFER = {
  enabled: true,
  id: 'launch-offer-2026',
  eyebrow: 'Limited-time offer',
  title: '20% off your first deep clean',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
  highlights: [
    'Valid for new customers',
    'Same-day slots available',
    'Eco-friendly products included',
  ],
  image: PLACEHOLDER_IMAGES.sprayBottle,
  cta: { label: 'Book this offer', href: '/#contact' },
  delayMs: 6000,
  excludedPaths: ['/contact', '/styleguide'],
} as const satisfies PromoOffer
