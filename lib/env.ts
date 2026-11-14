import { z } from 'zod'

/**
 * Validated environment. Import `env` instead of reading `process.env`
 * directly so a missing or malformed variable fails loudly at startup.
 *
 * NEXT_PUBLIC_* values must be referenced literally (process.env.NEXT_PUBLIC_X)
 * so Next.js can inline them into the client bundle.
 */
/** SMTP settings for the Contact page's email option. All or none. */
const SMTP_KEYS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'MAIL_FROM',
  'CONTACT_FORM_RECIPIENT',
] as const

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    NEXT_PUBLIC_SITE_URL: z.url(),
    SMTP_HOST: z.string().min(1).optional(),
    SMTP_PORT: z.coerce.number().int().positive().optional(),
    /** "true" for port 465 (implicit TLS); "false" for 587 (STARTTLS). */
    SMTP_SECURE: z
      .enum(['true', 'false'])
      .default('false')
      .transform((value) => value === 'true'),
    SMTP_USER: z.string().min(1).optional(),
    SMTP_PASS: z.string().min(1).optional(),
    /** Sender, e.g. "Sparkle Pro <no-reply@example.com>". */
    MAIL_FROM: z.string().min(3).optional(),
    /** Inbox that receives enquiries. */
    CONTACT_FORM_RECIPIENT: z.email().optional(),
  })
  .superRefine((values, ctx) => {
    const missing = SMTP_KEYS.filter((key) => values[key] === undefined)
    if (missing.length > 0 && missing.length < SMTP_KEYS.length) {
      ctx.addIssue({
        code: 'custom',
        path: [missing[0] ?? 'SMTP_HOST'],
        message: `Email is partly configured. Also set: ${missing.join(', ')}`,
      })
    }
  })

const resolveSiteUrl = (): string | undefined => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3000'
  }
  return undefined
}

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: resolveSiteUrl(),
  // Empty strings (e.g. `SMTP_HOST=` in .env) count as unset.
  SMTP_HOST: process.env.SMTP_HOST || undefined,
  SMTP_PORT: process.env.SMTP_PORT || undefined,
  SMTP_SECURE: process.env.SMTP_SECURE || undefined,
  SMTP_USER: process.env.SMTP_USER || undefined,
  SMTP_PASS: process.env.SMTP_PASS || undefined,
  MAIL_FROM: process.env.MAIL_FROM || undefined,
  CONTACT_FORM_RECIPIENT: process.env.CONTACT_FORM_RECIPIENT || undefined,
})

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    z.flattenError(parsed.error).fieldErrors
  )
  throw new Error('Invalid environment variables — see .env.example')
}

export const env = parsed.data
