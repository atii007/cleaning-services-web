import Image from 'next/image'

import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { SectionHeading } from '@/components/shared/SectionHeading'
import type { ImageAsset } from '@/types/content'
import type { BreadcrumbItem } from '@/types/site'

type PageHeroProps = {
  title: string
  eyebrow?: string
  description?: string
  image: ImageAsset
  /** Trail after "Home"; the last item is the current page. */
  breadcrumbs: BreadcrumbItem[]
}

/** Inner-page banner: photo, scrim, breadcrumbs and the page's single h1. */
export const PageHero = ({
  title,
  eyebrow,
  description,
  image,
  breadcrumbs,
}: PageHeroProps) => (
  <section className="relative isolate overflow-hidden bg-inverse">
    <Image
      src={image.src}
      alt=""
      fill
      priority
      sizes="100vw"
      className="-z-20 object-cover"
    />
    <div aria-hidden className="absolute inset-0 -z-10 bg-overlay" />
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-linear-to-t from-overlay via-transparent to-transparent"
    />
    <div className="container-page py-20 sm:py-28 lg:py-32">
      {/* CSS entrance (not JS) so the h1 paints immediately for LCP. */}
      <div className="motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in motion-safe:slide-in-from-bottom-4">
        <Breadcrumbs items={breadcrumbs} inverse />
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="start"
          inverse
          className="mt-6"
        />
      </div>
    </div>
  </section>
)
