import { cn } from 'cn'

import { Icon } from '@/components/shared/Icon'
import { SITE_CONFIG } from '@/content/site'

type CertificationListProps = {
  /** Light text and borders for the dark footer. */
  inverse?: boolean
  className?: string
}

/** Grid of certifications and licences from the site config. */
export const CertificationList = ({
  inverse = false,
  className,
}: CertificationListProps) => (
  <ul
    className={cn(
      'grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6',
      className
    )}
  >
    {SITE_CONFIG.certifications.map((certification) => (
      <li
        key={certification.name}
        className={cn(
          'flex items-center gap-3 rounded-xl border p-3 transition-colors hover:border-primary/60',
          inverse ? 'border-inverse-muted-foreground/15' : 'bg-card'
        )}
      >
        <span
          className={cn(
            'inline-flex size-10 shrink-0 items-center justify-center rounded-full',
            inverse
              ? 'bg-primary/15 text-primary-light'
              : 'bg-primary-muted text-primary-muted-foreground'
          )}
        >
          <Icon name={certification.icon} className="size-5" />
        </span>
        <span className="flex min-w-0 flex-col">
          <span
            className={cn(
              'text-sm font-semibold',
              inverse ? 'text-inverse-foreground' : 'text-heading'
            )}
          >
            {certification.name}
          </span>
          <span className={cn('text-xs', !inverse && 'text-muted-foreground')}>
            {certification.issuer}
          </span>
        </span>
      </li>
    ))}
  </ul>
)
