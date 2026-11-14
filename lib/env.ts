import { z } from 'zod'

/**
 * Validated environment. Import `env` instead of reading `process.env`
 * directly so a missing or malformed variable fails loudly at startup.
 *
 * NEXT_PUBLIC_* values must be referenced literally (process.env.NEXT_PUBLIC_X)
 * so Next.js can inline them into the client bundle.
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_SITE_URL: z.url(),
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
})

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    z.flattenError(parsed.error).fieldErrors
  )
  throw new Error('Invalid environment variables — see .env.example')
}

export const env = parsed.data
