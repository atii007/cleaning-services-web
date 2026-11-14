import type { Metadata } from 'next'

import { CtaBand } from '@/components/shared/CtaBand'
import { EnquirySection } from '@/components/shared/EnquirySection'
import { PageHero } from '@/components/shared/PageHero'
import { SERVICES_INDEX } from '@/content/service-page'
import { ServicesIndexGrid } from '@/sections/services/ServicesIndexGrid'

export const metadata: Metadata = {
  title: SERVICES_INDEX.title,
  description: SERVICES_INDEX.metaDescription,
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={SERVICES_INDEX.eyebrow}
        title={SERVICES_INDEX.title}
        description={SERVICES_INDEX.description}
        image={SERVICES_INDEX.image}
        breadcrumbs={[{ label: SERVICES_INDEX.title, href: '/services' }]}
      />
      <ServicesIndexGrid />
      <EnquirySection className="bg-surface" />
      <CtaBand quoteHref="#contact" />
    </>
  )
}
