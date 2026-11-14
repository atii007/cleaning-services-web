import Link from 'next/link'
import { cn } from 'cn'
import { ArrowRightIcon } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

import { Icon } from '@/components/shared/Icon'
import { Reveal } from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { SERVICE_PAGE_COPY } from '@/content/service-page'
import { getSubServiceHref } from '@/content/services'
import { getBookingMessage, getWhatsAppUrl } from '@/lib/contact'
import { formatPrice } from '@/lib/format'
import type { SubService } from '@/types/content'

type SubServiceGridProps = {
  serviceSlug: string
  serviceTitle: string
  /** Overrides the default heading, e.g. on a sub-service page. */
  title?: string
  items: SubService[]
  className?: string
}

const COPY = SERVICE_PAGE_COPY.subServices

/** One card per sub-service, each with a WhatsApp "Book now". */
export const SubServiceGrid = ({
  serviceSlug,
  serviceTitle,
  title,
  items,
  className,
}: SubServiceGridProps) => (
  <section
    className={cn('section', className)}
    aria-labelledby="sub-services-heading"
  >
    <div className="container-page">
      <SectionHeading
        id="sub-services-heading"
        eyebrow={COPY.eyebrow}
        title={title ?? COPY.title(serviceTitle)}
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.slug}>
            <Reveal delay={(index % 3) * 0.08} className="h-full">
              <article className="group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-heading/5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary-muted text-primary-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon name={item.icon} className="size-6" />
                  </span>
                  {item.priceFrom !== undefined ? (
                    <p className="text-end">
                      <span className="block text-xs text-muted-foreground">
                        {SERVICE_PAGE_COPY.startingFrom}
                      </span>
                      <span className="font-heading text-lg font-bold text-heading">
                        {formatPrice(item.priceFrom)}
                      </span>
                    </p>
                  ) : null}
                </div>
                <h3 className="mt-5 text-lg font-bold">
                  {item.detail ? (
                    <Link
                      href={getSubServiceHref(serviceSlug, item.slug)}
                      className="hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {item.summary}
                </p>
                {item.detail ? (
                  <Link
                    href={getSubServiceHref(serviceSlug, item.slug)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
                  >
                    {SERVICE_PAGE_COPY.learnMore}
                    <span className="sr-only"> about {item.title}</span>
                    <ArrowRightIcon
                      className="size-4 rtl:rotate-180"
                      aria-hidden
                    />
                  </Link>
                ) : null}
                <Button
                  asChild
                  size="lg"
                  className="mt-6 h-11 bg-success text-success-foreground hover:bg-success/85"
                >
                  <a
                    href={getWhatsAppUrl(
                      getBookingMessage(serviceTitle, item.title)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp aria-hidden />
                    {COPY.book}
                    <span className="sr-only"> {item.title} on WhatsApp</span>
                  </a>
                </Button>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
