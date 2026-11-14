import Link from 'next/link'
import { cn } from 'cn'
import { PhoneIcon } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/content/site'
import { getTelHref, getWhatsAppUrl } from '@/lib/contact'

export type ContactAction = 'quote' | 'call' | 'whatsapp'

type ContactActionsProps = {
  actions?: ContactAction[]
  /** Outline buttons switch to light text for `inverse` / `overlay` bands. */
  inverse?: boolean
  /** Stack buttons full-width (drawer, narrow cards). */
  stacked?: boolean
  /** Overrides the quote link, e.g. `#contact` on pages with their own form. */
  quoteHref?: string
  /** Called when any action is clicked, e.g. to close a drawer. */
  onAction?: () => void
  className?: string
}

const BUTTON_SIZE = 'h-12 px-6 text-base'

/** Shared quote / call / WhatsApp button group. */
export const ContactActions = ({
  actions = ['whatsapp', 'call', 'quote'],
  inverse = false,
  stacked = false,
  quoteHref,
  onAction,
  className,
}: ContactActionsProps) => {
  const { ctas, contact } = SITE_CONFIG
  const primaryPhone = contact.phones[0]
  const buttonClass = cn(BUTTON_SIZE, stacked && 'w-full')

  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        !stacked && 'sm:flex-row sm:flex-wrap',
        className
      )}
    >
      {actions.map((action) => {
        if (action === 'quote') {
          return (
            <Button key={action} asChild size="lg" className={buttonClass}>
              <Link href={quoteHref ?? ctas.quote.href} onClick={onAction}>
                {ctas.quote.label}
              </Link>
            </Button>
          )
        }
        if (action === 'call') {
          return primaryPhone ? (
            <Button
              key={action}
              asChild
              size="lg"
              variant="outline"
              className={cn(
                buttonClass,
                inverse &&
                  'border-overlay-foreground/30 bg-transparent text-overlay-foreground hover:bg-overlay-foreground/10 hover:text-overlay-foreground dark:border-overlay-foreground/30 dark:bg-transparent dark:hover:bg-overlay-foreground/10'
              )}
            >
              <a href={getTelHref(primaryPhone.tel)} onClick={onAction}>
                <PhoneIcon aria-hidden />
                {primaryPhone.display}
                <span className="sr-only"> — {ctas.call}</span>
              </a>
            </Button>
          ) : null
        }
        return (
          <Button
            key={action}
            asChild
            size="lg"
            className={cn(
              buttonClass,
              'bg-success text-success-foreground hover:bg-success/85'
            )}
          >
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onAction}
            >
              <FaWhatsapp aria-hidden />
              {ctas.whatsapp}
            </a>
          </Button>
        )
      })}
    </div>
  )
}
