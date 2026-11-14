import Link from 'next/link'
import { cn } from 'cn'
import { SparklesIcon } from 'lucide-react'

import { SITE_CONFIG } from '@/content/site'

/** Placeholder wordmark — replace with the real logo asset later. */
export const Logo = ({
  className,
  inverse = false,
}: {
  className?: string
  inverse?: boolean
}) => (
  <Link
    href="/"
    aria-label={`${SITE_CONFIG.name} — home`}
    className={cn('inline-flex items-center gap-2', className)}
  >
    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
      <SparklesIcon className="size-5" aria-hidden />
    </span>
    <span
      className={cn(
        'font-heading text-lg font-bold tracking-tight',
        inverse ? 'text-inverse-foreground' : 'text-heading'
      )}
    >
      {SITE_CONFIG.shortName}
    </span>
  </Link>
)
