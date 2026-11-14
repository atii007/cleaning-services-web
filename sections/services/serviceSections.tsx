import { EnquirySection } from '@/components/shared/EnquirySection'
import type { ServiceArea } from '@/content/areas'
import { SERVICE_PAGE_COPY } from '@/content/service-page'
import { AreasServed } from '@/sections/services/AreasServed'
import { PlansComparison } from '@/sections/services/PlansComparison'
import type { StackSection } from '@/sections/services/SectionStack'
import { ServiceBenefits } from '@/sections/services/ServiceBenefits'
import { ServiceFaq } from '@/sections/services/ServiceFaq'
import { SubServiceGrid } from '@/sections/services/SubServiceGrid'
import type { Faq, ServiceCategory, SubService } from '@/types/content'

/*
 * Section builders shared by the category, sub-service and area templates.
 * Each returns null when there is no data, so every section stays optional.
 */

export const subServicesSection = (
  service: ServiceCategory,
  items: SubService[] | undefined = service.subServices,
  title?: string
): StackSection | null =>
  items && items.length > 0
    ? {
        key: 'sub-services',
        render: (className) => (
          <SubServiceGrid
            serviceSlug={service.slug}
            serviceTitle={service.title}
            items={items}
            title={title}
            className={className}
          />
        ),
      }
    : null

export const plansSection = (service: ServiceCategory): StackSection | null => {
  const { plans, planFeatures } = service
  return plans && plans.length > 0
    ? {
        key: 'plans',
        render: (className) => (
          <PlansComparison
            serviceTitle={service.title}
            plans={plans}
            features={planFeatures}
            className={className}
          />
        ),
      }
    : null
}

export const benefitsSection = (
  service: ServiceCategory
): StackSection | null => {
  const { benefits } = service
  return benefits && benefits.length > 0
    ? {
        key: 'benefits',
        render: (className) => (
          <ServiceBenefits
            serviceTitle={service.title}
            benefits={benefits}
            className={className}
          />
        ),
      }
    : null
}

export const faqSection = (faqs: Faq[] | undefined): StackSection | null =>
  faqs && faqs.length > 0
    ? {
        key: 'faqs',
        render: (className) => <ServiceFaq faqs={faqs} className={className} />,
      }
    : null

export const areasSection = (
  service: ServiceCategory,
  areas: readonly ServiceArea[],
  title?: string
): StackSection | null =>
  areas.length > 0
    ? {
        key: 'areas',
        render: (className) => (
          <AreasServed
            serviceSlug={service.slug}
            serviceTitle={service.title}
            areas={areas}
            title={title}
            className={className}
          />
        ),
      }
    : null

export const enquirySection = (
  service: ServiceCategory,
  area?: string
): StackSection => ({
  key: 'enquiry',
  render: (className) => (
    <EnquirySection
      defaultService={service.slug}
      defaultArea={area}
      title={SERVICE_PAGE_COPY.enquiryTitle(service.title)}
      className={className}
    />
  ),
})
