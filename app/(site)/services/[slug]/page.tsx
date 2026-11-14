import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  getServiceCategory,
  getServiceHref,
  SERVICE_CATEGORIES,
} from '@/content/services'
import { ServiceCategoryPage } from '@/sections/services/ServiceCategoryPage'
import { ServicePageSkeleton } from '@/sections/services/ServicePageSkeleton'

/** Prerender one page per category in content/services. */
export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceCategory(slug)
  if (!service) {
    return {}
  }
  const description = service.metaDescription ?? service.summary
  return {
    title: service.title,
    description,
    alternates: { canonical: getServiceHref(service.slug) },
    openGraph: {
      title: service.title,
      description,
      url: getServiceHref(service.slug),
      images: [{ url: service.image.src, alt: service.image.alt }],
    },
  }
}

type ServiceParams = PageProps<'/services/[slug]'>['params']

/**
 * Reads the slug inside <Suspense> so client navigations stay instant
 * (Cache Components validation). Known slugs are still fully prerendered.
 */
const ServiceContent = async ({ params }: { params: ServiceParams }) => {
  const { slug } = await params
  const service = getServiceCategory(slug)
  if (!service) {
    notFound()
  }
  return <ServiceCategoryPage service={service} />
}

export default function ServicePage({ params }: PageProps<'/services/[slug]'>) {
  return (
    <Suspense fallback={<ServicePageSkeleton />}>
      <ServiceContent params={params} />
    </Suspense>
  )
}
