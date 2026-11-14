import { z } from 'zod'

import { SERVICE_CATEGORIES } from '@/content/services'

export const ENQUIRY_SERVICE_OTHER = 'other'

const SERVICE_VALUES = [
  ...SERVICE_CATEGORIES.map((service) => service.slug),
  ENQUIRY_SERVICE_OTHER,
]

/**
 * Enquiry form. Shared by the client form (react-hook-form) and the server
 * action that emails an enquiry from the Contact page.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name')
    .max(80, 'Name is too long'),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, 'Enter a valid phone number'),
  /** Optional; used as the reply-to address on emailed enquiries. */
  email: z.union([
    z.literal(''),
    z.email('Enter a valid email address').trim().max(120),
  ]),
  service: z.enum(SERVICE_VALUES, { error: 'Choose a service' }),
  area: z.string().trim().max(80, 'Keep the area under 80 characters'),
  preferredDate: z.string().trim(),
  message: z.string().trim().max(500, 'Keep the message under 500 characters'),
})

export type EnquiryValues = z.infer<typeof enquirySchema>

/** Anti-spam fields sent alongside an emailed enquiry. */
export const enquirySpamSchema = z.object({
  /** Honeypot: hidden from people, so any value means a bot. */
  website: z.string().max(200),
  /** `Date.now()` when the form was rendered. */
  startedAt: z.number().int().nonnegative(),
  /** Path of the page the enquiry was sent from. */
  page: z.string().max(200),
})

export type EnquirySpamValues = z.infer<typeof enquirySpamSchema>
