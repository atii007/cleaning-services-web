'use server'

import { headers } from 'next/headers'

import { ENQUIRY_FORM } from '@/content/contact'
import { isEmailConfigured, sendEnquiryMail } from '@/lib/mail'
import { createRateLimiter } from '@/lib/rate-limit'
import {
  enquirySchema,
  enquirySpamSchema,
  type EnquirySpamValues,
  type EnquiryValues,
} from '@/schemas/enquiry'

/** Faster than this (ms from render to submit) is treated as a bot. */
const MIN_FILL_MS = 3000

const isAllowed = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 })

export type EnquiryEmailResult =
  { status: 'sent' } | { status: 'error'; message: string }

const getClientIp = async (): Promise<string> => {
  const headerList = await headers()
  return (
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headerList.get('x-real-ip') ??
    'unknown'
  )
}

/**
 * Emails an enquiry from the Contact page. Every input is re-validated:
 * a Server Action is a public POST endpoint, whatever the UI allows.
 */
export const sendEnquiryEmail = async (
  values: EnquiryValues,
  spam: EnquirySpamValues
): Promise<EnquiryEmailResult> => {
  const { errors } = ENQUIRY_FORM.email
  if (!isEmailConfigured()) {
    return { status: 'error', message: errors.unavailable }
  }

  const parsed = enquirySchema.safeParse(values)
  const parsedSpam = enquirySpamSchema.safeParse(spam)
  if (!parsed.success || !parsedSpam.success) {
    return { status: 'error', message: errors.invalid }
  }

  // Bots: pretend it worked so they don't learn to adapt.
  if (parsedSpam.data.website !== '') {
    return { status: 'sent' }
  }
  if (Date.now() - parsedSpam.data.startedAt < MIN_FILL_MS) {
    return { status: 'error', message: errors.tooFast }
  }
  if (!isAllowed(await getClientIp())) {
    return { status: 'error', message: errors.rateLimited }
  }

  try {
    await sendEnquiryMail(parsed.data, parsedSpam.data.page)
    return { status: 'sent' }
  } catch (error) {
    console.error('Enquiry email failed:', error)
    return { status: 'error', message: errors.failed }
  }
}
