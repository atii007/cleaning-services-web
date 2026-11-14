import type * as React from 'react'

import { ContactActions } from '@/components/shared/ContactActions'
import { CtaBand } from '@/components/shared/CtaBand'
import { EnquirySection } from '@/components/shared/EnquirySection'
import { PageHero } from '@/components/shared/PageHero'
import { SERVICE_AREAS } from '@/content/areas'
import { SERVICE_PAGE_COPY } from '@/content/service-page'
import { getStartingPrice } from '@/content/services'
import { getServiceJsonLd, serializeJsonLd } from '@/lib/seo'
import { AreasServed } from '@/sections/services/AreasServed'
import { PlansComparison } from '@/sections/services/PlansComparison'
import { ServiceBenefits } from '@/sections/services/ServiceBenefits'
import { ServiceContentBlocks } from '@/sections/services/ServiceContentBlocks'
import { ServiceFaq } from '@/sections/services/ServiceFaq'
import { ServiceIntro } from '@/sections/services/ServiceIntro'
import { SubServiceGrid } from '@/sections/services/SubServiceGrid'
import type { ServiceCategory } from '@/types/content'

type SectionRenderer = (className: string | undefined) => React.ReactNode

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
  const { title, intro, subServices, blocks, plans, planFeatures } = service
  const { benefits, faqs } = service
  const startingPrice = getStartingPrice(service)

  const sections: [string, SectionRenderer][] = []
  if (intro) {
    sections.push([
      'intro',
      (className) => (
        <ServiceIntro
          intro={intro}
          eyebrow={title}
          startingPrice={startingPrice}
          className={className}
        />
      ),
    ])
  }
  if (subServices && subServices.length > 0) {
    sections.push([
      'sub-services',
      (className) => (
        <SubServiceGrid
          serviceTitle={title}
          items={subServices}
          className={className}
        />
      ),
    ])
  }
  if (blocks && blocks.length > 0) {
    sections.push([
      'blocks',
      (className) => (
        <ServiceContentBlocks blocks={blocks} className={className} />
      ),
    ])
  }
  if (plans && plans.length > 0) {
    sections.push([
      'plans',
      (className) => (
        <PlansComparison
          serviceTitle={title}
          plans={plans}
          features={planFeatures}
          className={className}
        />
      ),
    ])
  }
  if (benefits && benefits.length > 0) {
    sections.push([
      'benefits',
      (className) => (
        <ServiceBenefits
          serviceTitle={title}
          benefits={benefits}
          className={className}
        />
      ),
    ])
  }
  if (faqs && faqs.length > 0) {
    sections.push([
      'faqs',
      (className) => <ServiceFaq faqs={faqs} className={className} />,
    ])
  }
  if (SERVICE_AREAS.length > 0) {
    sections.push([
      'areas',
      (className) => (
        <AreasServed
          serviceTitle={title}
          areas={SERVICE_AREAS}
          className={className}
        />
      ),
    ])
  }
  sections.push([
    'enquiry',
    (className) => (
      <EnquirySection
        defaultService={service.slug}
        title={SERVICE_PAGE_COPY.enquiryTitle(title)}
        className={className}
      />
    ),
  ])

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
      {sections.map(([key, render], index) => (
        <div key={key}>
          {render(index % 2 === 1 ? 'bg-surface' : undefined)}
        </div>
      ))}
      <CtaBand quoteHref="#contact" />
    </>
  )
}
