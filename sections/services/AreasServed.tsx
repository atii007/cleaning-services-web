import { cn } from 'cn'
import { MapPinIcon } from 'lucide-react'

import { SectionHeading } from '@/components/shared/SectionHeading'
import { SERVICE_PAGE_COPY } from '@/content/service-page'

type AreasServedProps = {
  serviceTitle: string
  areas: readonly string[]
  className?: string
}

const COPY = SERVICE_PAGE_COPY.areas

/** Area chips. They become links to area pages in Phase 4. */
export const AreasServed = ({
  serviceTitle,
  areas,
  className,
}: AreasServedProps) => (
  <section className={cn('section', className)} aria-labelledby="areas-heading">
    <div className="container-page">
      <SectionHeading
        id="areas-heading"
        eyebrow={COPY.eyebrow}
        title={COPY.title(serviceTitle)}
        description={COPY.description(areas.length)}
      />
      <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
        {areas.map((area) => (
          <li
            key={area}
            className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium text-heading"
          >
            <MapPinIcon className="size-3.5 text-primary" aria-hidden />
            {area}
          </li>
        ))}
      </ul>
    </div>
  </section>
)
