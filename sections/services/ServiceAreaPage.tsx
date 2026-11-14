import { ContactActions } from '@/components/shared/ContactActions'
import { CtaBand } from '@/components/shared/CtaBand'
import { PageHero } from '@/components/shared/PageHero'
import { AREAS, type ServiceArea } from '@/content/areas'
import { SERVICE_PAGE_COPY } from '@/content/service-page'
import { getServiceAreaHref, getServiceHref } from '@/content/services'
import { getAreaBookingMessage } from '@/lib/contact'
import { getServiceJsonLd, serializeJsonLd } from '@/lib/seo'
import { SectionStack } from '@/sections/services/SectionStack'
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

type ServiceAreaPageProps = {
  service: ServiceCategory
  area: ServiceArea
}

const COPY = SERVICE_PAGE_COPY.area

/**
 * "{Service} in {Area}" landing page. Text comes from templates in
 * content/service-page.ts; everything else reuses the category's content.
 */
export const ServiceAreaPage = ({ service, area }: ServiceAreaPageProps) => {
  const path = getServiceAreaHref(service.slug, area.slug)
  const title = COPY.title(service.title, area.name)
  const otherAreas = AREAS.filter((item) => item.slug !== area.slug)

  const sections = [
    {
      key: 'intro',
      render: (className: string | undefined) => (
        <ServiceIntro
          intro={{
            title: COPY.introTitle(service.title, area.name),
            paragraphs: COPY.intro(service.title, area.name),
            bullets: service.intro?.bullets,
            image: service.intro?.image,
          }}
          eyebrow={COPY.eyebrow(area.name)}
          className={className}
        />
      ),
    },
    subServicesSection(service),
    plansSection(service),
    benefitsSection(service),
    faqSection(service.faqs),
    areasSection(service, otherAreas, COPY.otherAreasTitle(service.title)),
    enquirySection(service, area.name),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            getServiceJsonLd(service, {
              name: title,
              description: COPY.metaDescription(service.title, area.name),
              path,
              areas: [area.name],
            })
          ),
        }}
      />
      <PageHero
        eyebrow={COPY.eyebrow(area.name)}
        title={title}
        description={COPY.description(service.title, area.name)}
        image={service.image}
        breadcrumbs={[
          { label: SERVICE_PAGE_COPY.breadcrumbLabel, href: '/services' },
          { label: service.title, href: getServiceHref(service.slug) },
          { label: area.name, href: path },
        ]}
        actions={
          <ContactActions
            actions={['whatsapp', 'call']}
            whatsappMessage={getAreaBookingMessage(service.title, area.name)}
            inverse
          />
        }
      />
      <SectionStack sections={sections} />
      <CtaBand quoteHref="#contact" />
    </>
  )
}
