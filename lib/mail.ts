import nodemailer, { type Transporter } from 'nodemailer'

import { SITE_CONFIG } from '@/content/site'
import { getServiceLabel } from '@/lib/contact'
import { env } from '@/lib/env'
import { absoluteUrl } from '@/lib/seo'
import type { EnquiryValues } from '@/schemas/enquiry'

import 'server-only'

/** True when every SMTP variable is set (see lib/env.ts). */
export const isEmailConfigured = (): boolean =>
  env.SMTP_HOST !== undefined && env.CONTACT_FORM_RECIPIENT !== undefined

let transporter: Transporter | undefined

const getTransporter = (): Transporter => {
  transporter ??= nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  })
  return transporter
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/** Removes line breaks so user input can't add email headers. */
const singleLine = (value: string): string => value.replace(/[\r\n]+/g, ' ')

const getRows = (values: EnquiryValues, page: string) =>
  [
    ['Name', values.name],
    ['Phone', values.phone],
    ['Email', values.email],
    ['Service', getServiceLabel(values.service)],
    ['Area', values.area],
    ['Preferred date', values.preferredDate],
    ['Details', values.message],
    ['Sent from', absoluteUrl(page)],
  ].filter((row): row is [string, string] => Boolean(row[1]))

/** Emails an enquiry to the business inbox. Throws if sending fails. */
export const sendEnquiryMail = async (
  values: EnquiryValues,
  page: string
): Promise<void> => {
  const rows = getRows(values, page)
  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n')
  const html = `<h2 style="font-family:sans-serif">New enquiry from ${escapeHtml(SITE_CONFIG.name)} website</h2>
<table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding:6px 16px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join('')}</table>`

  await getTransporter().sendMail({
    from: env.MAIL_FROM,
    to: env.CONTACT_FORM_RECIPIENT,
    replyTo: values.email || undefined,
    subject: singleLine(
      `New enquiry: ${getServiceLabel(values.service)} – ${values.name}`
    ),
    text,
    html,
  })
}
