import { ContactActions } from '@/components/shared/ContactActions'
import { CtaBand } from '@/components/shared/CtaBand'
import { PageHero } from '@/components/shared/PageHero'
import { AREAS } from '@/content/areas'
import { SERVICE_PAGE_COPY } from '@/content/service-page'
import { getStartingPrice } from '@/content/services'
import { getServiceJsonLd, serializeJsonLd } from '@/lib/seo'
import { SectionStack } from '@/sections/services/SectionStack'
import { ServiceContentBlocks } from '@/sections/services/ServiceContentBlocks'
import { ServiceIntro } from '@/sections/services/ServiceIntro'
import {
  areasSection,
  benefitsSection,
  enquirySection,
  faqSection,
  plansSection,
  subServicesSection,
} from '@/sections/services/serviceSections'
import type { ServiceCategory } from '@/types/content'

/**
 * The service category template. Every section is optional: it is only
 * rendered when the category's content provides data for it, and section
 * backgrounds alternate over whatever is left — so any category shape works
 * without touching this file.
 */
export const ServiceCategoryPage = ({
  service,
}: {
  service: ServiceCategory
}) => {
  const { title, intro, blocks } = service
  const startingPrice = getStartingPrice(service)

  const sections = [
    intro
      ? {
          key: 'intro',
          render: (className: string | undefined) => (
            <ServiceIntro
              intro={intro}
              eyebrow={title}
              startingPrice={startingPrice}
              className={className}
            />
          ),
        }
      : null,
    subServicesSection(service),
    blocks && blocks.length > 0
      ? {
          key: 'blocks',
          render: (className: string | undefined) => (
            <ServiceContentBlocks blocks={blocks} className={className} />
          ),
        }
      : null,
    plansSection(service),
    benefitsSection(service),
    faqSection(service.faqs),
    areasSection(service, AREAS),
    enquirySection(service),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(getServiceJsonLd(service)),
        }}
      />
      <PageHero
        eyebrow={service.hero?.eyebrow ?? service.tagline}
        title={title}
        description={service.hero?.description ?? service.summary}
        image={service.image}
        breadcrumbs={[
          { label: SERVICE_PAGE_COPY.breadcrumbLabel, href: '/services' },
          { label: title, href: `/services/${service.slug}` },
        ]}
        actions={<ContactActions actions={['whatsapp', 'call']} inverse />}
      />
      <SectionStack sections={sections} />
      <CtaBand quoteHref="#contact" />
    </>
  )
}
