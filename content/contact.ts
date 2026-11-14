import { PLACEHOLDER_IMAGES } from '@/content/images'
import type { Faq, MapEmbed, SectionCopy } from '@/types/content'

/** Enquiry section, form and contact panel copy — PLACEHOLDER CONTENT. */

export const CONTACT_SECTION = {
  eyebrow: 'Contact us 24/7',
  title: 'Tell us what you need — we reply on WhatsApp in minutes',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fill in the form and it opens WhatsApp with your request ready to send.',
} as const satisfies SectionCopy

export const ENQUIRY_FORM = {
  title: 'Request a free quote',
  fields: {
    name: { label: 'Full name', placeholder: 'Your name' },
    phone: { label: 'Phone / WhatsApp', placeholder: '+971 50 000 0000' },
    email: { label: 'Email', placeholder: 'you@example.com' },
    service: { label: 'Service', placeholder: 'Choose a service' },
    area: { label: 'Area', placeholder: 'e.g. Al Reem Island' },
    preferredDate: { label: 'Preferred date' },
    message: {
      label: 'Details',
      placeholder: 'Property size, rooms, anything we should know…',
    },
  },
  optional: 'Optional',
  otherService: 'Other / not sure',
  submit: 'Send on WhatsApp',
  note: 'Sending opens WhatsApp with your request ready — just tap send.',
  callPrompt: 'Prefer to talk?',
  success: 'WhatsApp opened — tap send and we will reply shortly.',
  /** Shown only on the Contact page, when email sending is configured. */
  email: {
    submit: 'Send by email',
    choose: 'Choose how to send your request',
    note: 'WhatsApp is fastest. Email replies usually arrive within one working day.',
    sending: 'Sending…',
    successTitle: 'Thanks — your request has been sent',
    successText:
      'We will reply by phone or email, usually within one working day.',
    sendAnother: 'Send another request',
    alsoWhatsApp: 'Need it sooner? Chat on WhatsApp',
    whatsAppInstead: 'Send on WhatsApp instead',
    honeypotLabel: 'Leave this field empty',
    errors: {
      unavailable: 'Email is not available right now. Please use WhatsApp.',
      invalid: 'Please check the form and try again.',
      tooFast: 'That was quick! Please wait a moment and try again.',
      rateLimited:
        'Too many requests from your connection. Please try again later or use WhatsApp.',
      failed: 'We could not send your email. Please use WhatsApp instead.',
    },
  },
} as const

export const CONTACT_PANEL = {
  title: 'Talk to us directly',
  whatsappTitle: 'Chat on WhatsApp',
  whatsappDescription: 'Fastest reply — usually within minutes',
} as const

/** The /contact page — PLACEHOLDER CONTENT. */
export const CONTACT_PAGE = {
  title: 'Contact us',
  eyebrow: 'We reply in minutes',
  description:
    'Message us on WhatsApp, call or send the form below. Our team is available 24/7.',
  metaDescription:
    'Contact our cleaning team on WhatsApp, by phone or email. Free quotes, 24/7 booking and fast replies.',
  image: PLACEHOLDER_IMAGES.windowCleaning,
  faqSection: {
    eyebrow: 'Good to know',
    title: 'Questions before you book',
    description:
      'Anything else? Message us on WhatsApp and we will reply in minutes.',
  } satisfies SectionCopy,
} as const

export const CONTACT_FAQS: Faq[] = [
  {
    question: 'How quickly will you reply?',
    answer:
      'WhatsApp messages are usually answered within a few minutes, day or night. Emails are answered within one working day.',
  },
  {
    question: 'Can I get a quote without a site visit?',
    answer:
      'Yes. Send a few photos and the property size on WhatsApp and we will give you a quote. For large or commercial jobs we may suggest a free site visit.',
  },
  {
    question: 'Do I need to be home during the service?',
    answer:
      'No. Many customers leave a key with security or the concierge. We send WhatsApp updates when we arrive and when we finish.',
  },
  {
    question: 'Which areas do you cover?',
    answer:
      'We cover the whole city and surrounding communities. Each service page lists the areas we serve.',
  },
]

/**
 * Office map. Set to `undefined` to hide the map. The embed URL must be on
 * an origin allowed by `frame-src` in next.config.ts.
 */
export const CONTACT_MAP: MapEmbed | undefined = {
  title: 'Our office location on Google Maps',
  embedUrl: 'https://www.google.com/maps?q=Abu+Dhabi+Corniche&output=embed',
  linkUrl: 'https://www.google.com/maps/search/?api=1&query=Abu+Dhabi+Corniche',
}

export const CONTACT_MAP_COPY = {
  eyebrow: 'Visit us',
  title: 'Find our office',
  openInMaps: 'Open in Google Maps',
} as const
