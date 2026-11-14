import { cn } from 'cn'
import { ExternalLinkIcon, MapPinIcon } from 'lucide-react'

import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { CONTACT_MAP_COPY } from '@/content/contact'
import { SITE_CONFIG } from '@/content/site'
import type { MapEmbed } from '@/types/content'

type ContactMapProps = {
  map: MapEmbed
  className?: string
}

/** Lazy-loaded map embed with the office address and an external link. */
export const ContactMap = ({ map, className }: ContactMapProps) => {
  const { address } = SITE_CONFIG.contact

  return (
    <section className={cn('section', className)} aria-labelledby="map-heading">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionHeading
              id="map-heading"
              eyebrow={CONTACT_MAP_COPY.eyebrow}
              title={CONTACT_MAP_COPY.title}
              align="start"
            />
            <address className="mt-4 flex items-start gap-2 text-muted-foreground not-italic">
              <MapPinIcon
                className="mt-1 size-4 shrink-0 text-primary"
                aria-hidden
              />
              {address.street}, {address.locality}
            </address>
          </div>
          <Button asChild variant="outline" size="lg" className="h-11 px-5">
            <a href={map.linkUrl} target="_blank" rel="noopener noreferrer">
              {CONTACT_MAP_COPY.openInMaps}
              <ExternalLinkIcon aria-hidden />
            </a>
          </Button>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border bg-muted shadow-sm">
          <iframe
            src={map.embedUrl}
            title={map.title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-4/3 w-full sm:aspect-video lg:aspect-21/9"
          />
        </div>
      </div>
    </section>
  )
}
