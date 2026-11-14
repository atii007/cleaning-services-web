import { ContactActions } from '@/components/shared/ContactActions'
import { CtaBand } from '@/components/shared/CtaBand'
import { PageHero } from '@/components/shared/PageHero'
import { AREAS } from '@/content/areas'
import { SERVICE_PAGE_COPY } from '@/content/service-page'
import { getServiceHref, getSubServiceHref } from '@/content/services'
import { getBookingMessage } from '@/lib/contact'
import { getServiceJsonLd, serializeJsonLd } from '@/lib/seo'
import { SectionStack } from '@/sections/services/SectionStack'
import { ServiceIntro } from '@/sections/services/ServiceIntro'
import {
  areasSection,
  enquirySection,
  faqSection,
  subServicesSection,
} from '@/sections/services/serviceSections'
import type {
  ServiceCategory,
  SubService,
  SubServiceDetail,
} from '@/types/content'

type SubServicePageProps = {
  service: ServiceCategory
  sub: SubService
  detail: SubServiceDetail
}

const COPY = SERVICE_PAGE_COPY.subService

/** Page for one sub-service. Sections without data are skipped. */
export const SubServicePage = ({
  service,
  sub,
  detail,
}: SubServicePageProps) => {
  const path = getSubServiceHref(service.slug, sub.slug)
  const siblings = (service.subServices ?? []).filter(
    (item) => item.slug !== sub.slug
  )

  const sections = [
    {
      key: 'detail',
      render: (className: string | undefined) => (
        <ServiceIntro
          intro={{
            title: COPY.included,
            paragraphs: detail.description,
            bullets: detail.included,
            image: detail.image,
          }}
          eyebrow={sub.title}
          startingPrice={sub.priceFrom}
          className={className}
        />
      ),
    },
    faqSection(detail.faqs ?? service.faqs),
    subServicesSection(service, siblings, COPY.related(service.title)),
    areasSection(service, AREAS),
    enquirySection(service),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            getServiceJsonLd(service, {
              name: sub.title,
              description: sub.summary,
              path,
            })
          ),
        }}
      />
      <PageHero
        eyebrow={service.title}
        title={sub.title}
        description={sub.summary}
        image={service.image}
        breadcrumbs={[
          { label: SERVICE_PAGE_COPY.breadcrumbLabel, href: '/services' },
          { label: service.title, href: getServiceHref(service.slug) },
          { label: sub.title, href: path },
        ]}
        actions={
          <ContactActions
            actions={['whatsapp', 'call']}
            whatsappMessage={getBookingMessage(service.title, sub.title)}
            inverse
          />
        }
      />
      <SectionStack sections={sections} />
      <CtaBand quoteHref="#contact" />
    </>
  )
}
