import { ServiceCategoryGrid } from '@/components/shared/ServiceCategoryGrid'
import { SERVICES_INDEX } from '@/content/service-page'

export const ServicesIndexGrid = () => (
  <section className="section" aria-label={SERVICES_INDEX.title}>
    <div className="container-page">
      <ServiceCategoryGrid />
    </div>
  </section>
)
