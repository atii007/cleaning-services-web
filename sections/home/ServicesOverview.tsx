import { SectionHeading } from '@/components/shared/SectionHeading'
import { ServiceCategoryGrid } from '@/components/shared/ServiceCategoryGrid'
import { SERVICES_SECTION } from '@/content/home'

export const ServicesOverview = () => (
  <section className="bg-surface section" aria-labelledby="services-heading">
    <div className="container-page">
      <SectionHeading
        id="services-heading"
        eyebrow={SERVICES_SECTION.eyebrow}
        title={SERVICES_SECTION.title}
      />
      <ServiceCategoryGrid className="mt-12" />
    </div>
  </section>
)
