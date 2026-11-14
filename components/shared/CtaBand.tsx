import { cn } from 'cn'

import { ContactActions } from '@/components/shared/ContactActions'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTA_BAND } from '@/content/cta'

type CtaBandProps = {
  eyebrow?: string
  title?: string
  description?: string
  className?: string
}

/** Full-width conversion band that stays dark in both themes. */
export const CtaBand = ({
  eyebrow = CTA_BAND.eyebrow,
  title = CTA_BAND.title,
  description = CTA_BAND.description,
  className,
}: CtaBandProps) => (
  <section
    aria-labelledby="cta-band-heading"
    className={cn(
      'relative isolate overflow-hidden bg-inverse section-sm',
      className
    )}
  >
    {/* Decorative glow */}
    <div
      aria-hidden
      className="absolute -end-24 -top-24 -z-10 size-96 rounded-full bg-primary/25 blur-3xl"
    />
    <div
      aria-hidden
      className="absolute -start-32 -bottom-32 -z-10 size-96 rounded-full bg-highlight/10 blur-3xl"
    />
    <div className="container-page flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
      <SectionHeading
        id="cta-band-heading"
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="start"
        inverse
      />
      <ContactActions inverse className="shrink-0" />
    </div>
  </section>
)
