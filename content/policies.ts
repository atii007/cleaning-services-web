import { STATIC_TOP_LEVEL_SEGMENTS } from '@/constants/routes'
import { PLACEHOLDER_IMAGES } from '@/content/images'
import type { Policy } from '@/types/content'

/**
 * Policy pages — PLACEHOLDER CONTENT. Have the final wording reviewed
 * before launch. Each policy is served at /<slug>, and the footer's legal
 * links are built from this list. See docs/CONTENT-GUIDE.md.
 */

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.'

export const POLICIES: readonly Policy[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    metaDescription:
      'How we collect, use and protect the personal information you share when you book or contact us.',
    updatedAt: '2026-11-01',
    intro:
      'This policy explains what personal information we collect when you use this website or book a service, why we collect it and how we keep it safe.',
    sections: [
      {
        heading: 'Information we collect',
        paragraphs: [
          'When you send an enquiry or book a service we collect the details you give us. We do not ask for more than we need to provide the service.',
        ],
        bullets: [
          'Your name and phone or WhatsApp number',
          'Your address or area, for scheduling visits',
          'Details about the property and the service you need',
          'Your email address, if you choose to share it',
        ],
      },
      {
        heading: 'How we use your information',
        paragraphs: [
          'We use your details only to reply to your enquiry, schedule and carry out the service, send reminders and invoices, and improve our service.',
          LOREM,
        ],
      },
      {
        heading: 'WhatsApp and third parties',
        paragraphs: [
          'Enquiries sent through this website open WhatsApp on your device. Messages you send there are also covered by WhatsApp’s own privacy policy.',
          'We never sell your personal information. We share it only with staff and contractors who need it to deliver your service.',
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: [
          'We keep booking records for as long as the law requires for accounting purposes, then delete them.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You can ask to see, correct or delete the personal information we hold about you at any time. Contact us using the details on our contact page.',
        ],
      },
    ],
  },
  {
    slug: 'refund-policy',
    title: 'Refund Policy',
    metaDescription:
      'Our satisfaction guarantee, cancellation terms and how refunds are handled.',
    updatedAt: '2026-11-01',
    intro:
      'We want every visit to meet your expectations. This policy explains what happens if it does not, and how cancellations and refunds work.',
    sections: [
      {
        heading: 'Satisfaction guarantee',
        paragraphs: [
          'If you are not happy with any part of a cleaning service, tell us within 24 hours and we will return to fix it at no extra cost.',
        ],
      },
      {
        heading: 'Cancellations and rescheduling',
        paragraphs: [
          'You can cancel or reschedule free of charge up to 24 hours before your booking.',
        ],
        bullets: [
          'More than 24 hours’ notice: full refund or free reschedule',
          'Less than 24 hours’ notice: a cancellation fee may apply',
          'No access on arrival: the visit is charged in full',
        ],
      },
      {
        heading: 'How refunds are paid',
        paragraphs: [
          'Approved refunds are paid back to the original payment method within 7–14 working days.',
          LOREM,
        ],
      },
      {
        heading: 'Monthly plans',
        paragraphs: [
          'Monthly plans can be paused or cancelled with seven days’ notice. Unused visits in the current month are refunded pro rata.',
        ],
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    metaDescription:
      'The terms that apply when you use this website and book our cleaning, maid or pest control services.',
    updatedAt: '2026-11-01',
    intro:
      'These terms apply when you use this website or book any of our services. By booking, you agree to them.',
    sections: [
      {
        heading: 'Bookings',
        paragraphs: [
          'A booking is confirmed once we have agreed the service, date and price with you, usually by WhatsApp.',
          LOREM,
        ],
      },
      {
        heading: 'Prices and payment',
        paragraphs: [
          'Prices shown on this website are indicative. The final price depends on the size and condition of the property and is confirmed before the visit.',
        ],
      },
      {
        heading: 'Access and safety',
        paragraphs: [
          'Please make sure we can access the property at the agreed time, and tell us about pets, fragile items or anything that needs special care.',
        ],
        bullets: [
          'Secure valuables before the visit',
          'Tell us about any allergies or sensitivities',
          'Keep children and pets away from treated areas during pest control',
        ],
      },
      {
        heading: 'Liability',
        paragraphs: [
          'Our staff are insured. Report any damage within 48 hours of the visit and we will investigate and resolve it fairly.',
        ],
      },
      {
        heading: 'Changes to these terms',
        paragraphs: [
          'We may update these terms from time to time. The date at the top of this page shows when they last changed.',
        ],
      },
    ],
  },
]

// Fail the build early (with a clear message) if a policy slug would clash
// with another top-level page.
POLICIES.forEach((policy) => {
  if ((STATIC_TOP_LEVEL_SEGMENTS as readonly string[]).includes(policy.slug)) {
    throw new Error(
      `Policy slug "${policy.slug}" clashes with the /${policy.slug} page. Rename it.`
    )
  }
})

export const getPolicyHref = (slug: string): string => `/${slug}`

export const getPolicyBySlug = (slug: string): Policy | undefined =>
  POLICIES.find((policy) => policy.slug === slug)

/** Footer legal links. */
export const POLICY_NAV_ITEMS = POLICIES.map((policy) => ({
  label: policy.navLabel ?? policy.title,
  href: getPolicyHref(policy.slug),
}))

/** Every policy URL — feeds the sitemap and the 404 proxy. */
export const getAllPolicyPaths = (): string[] =>
  POLICIES.map((policy) => getPolicyHref(policy.slug))

export const POLICY_PAGE = {
  eyebrow: 'Legal',
  image: PLACEHOLDER_IMAGES.floorCleaning,
  updated: 'Last updated',
  contents: 'On this page',
} as const
