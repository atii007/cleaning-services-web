import { cn } from 'cn'

import { Icon } from '@/components/shared/Icon'
import { Reveal } from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { SERVICE_PAGE_COPY } from '@/content/service-page'
import type { Benefit, SectionCopy } from '@/types/content'

type ServiceBenefitsProps = {
  benefits: Benefit[]
  /** Builds the default heading ("Why customers trust our …"). */
  serviceTitle?: string
  /** Overrides the default heading copy entirely. */
  heading?: SectionCopy
  className?: string
}

const COPY = SERVICE_PAGE_COPY.benefits

export const ServiceBenefits = ({
  benefits,
  serviceTitle = '',
  heading = { eyebrow: COPY.eyebrow, title: COPY.title(serviceTitle) },
  className,
}: ServiceBenefitsProps) => (
  <section
    className={cn('section', className)}
    aria-labelledby="benefits-heading"
  >
    <div className="container-page">
      <SectionHeading
        id="benefits-heading"
        eyebrow={heading.eyebrow}
        title={heading.title}
        description={heading.description}
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <li key={benefit.title}>
            <Reveal
              delay={(index % 3) * 0.08}
              className="flex h-full gap-4 rounded-2xl border bg-card p-6"
            >
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon name={benefit.icon} className="size-6" />
              </span>
              <div>
                <h3 className="text-base font-semibold">{benefit.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
