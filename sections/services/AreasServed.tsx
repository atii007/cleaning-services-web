import Link from 'next/link'
import { cn } from 'cn'
import { MapPinIcon } from 'lucide-react'

import { SectionHeading } from '@/components/shared/SectionHeading'
import type { ServiceArea } from '@/content/areas'
import { SERVICE_PAGE_COPY } from '@/content/service-page'
import { getServiceAreaHref } from '@/content/services'

type AreasServedProps = {
  serviceSlug: string
  serviceTitle: string
  areas: readonly ServiceArea[]
  /** Overrides the default heading, e.g. "… in other areas". */
  title?: string
  className?: string
}

const COPY = SERVICE_PAGE_COPY.areas

/** Area chips, each linking to that service's page for the area. */
export const AreasServed = ({
  serviceSlug,
  serviceTitle,
  areas,
  title,
  className,
}: AreasServedProps) => (
  <section className={cn('section', className)} aria-labelledby="areas-heading">
    <div className="container-page">
      <SectionHeading
        id="areas-heading"
        eyebrow={COPY.eyebrow}
        title={title ?? COPY.title(serviceTitle)}
        description={COPY.description(areas.length)}
      />
      <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
        {areas.map((area) => (
          <li key={area.slug}>
            <Link
              href={getServiceAreaHref(serviceSlug, area.slug)}
              className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium text-heading transition-colors hover:border-primary hover:text-primary"
            >
              <MapPinIcon className="size-3.5 text-primary" aria-hidden />
              {area.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
