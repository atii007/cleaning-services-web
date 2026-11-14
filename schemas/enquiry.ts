import { z } from 'zod'

import { SERVICE_CATEGORIES } from '@/content/services'

export const ENQUIRY_SERVICE_OTHER = 'other'

const SERVICE_VALUES = [
  ...SERVICE_CATEGORIES.map((service) => service.slug),
  ENQUIRY_SERVICE_OTHER,
]

/**
 * Enquiry form. Shared by the client form (react-hook-form) and, from
 * Phase 6, any server action that also emails the enquiry.
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
  service: z.enum(SERVICE_VALUES, { error: 'Choose a service' }),
  area: z.string().trim().max(80, 'Keep the area under 80 characters'),
  preferredDate: z.string().trim(),
  message: z.string().trim().max(500, 'Keep the message under 500 characters'),
})

export type EnquiryValues = z.infer<typeof enquirySchema>
