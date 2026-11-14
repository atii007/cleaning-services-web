import type { SectionCopy } from '@/types/content'

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
} as const

export const CONTACT_PANEL = {
  title: 'Talk to us directly',
  whatsappTitle: 'Chat on WhatsApp',
  whatsappDescription: 'Fastest reply — usually within minutes',
} as const
