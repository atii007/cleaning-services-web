import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AREAS, getAreaBySlug } from '@/content/areas'
import { SERVICE_PAGE_COPY } from '@/content/service-page'
import {
  EMPTY_PARAM,
  getServiceAreaHref,
  getServiceCategory,
  SERVICE_CATEGORIES,
} from '@/content/services'
import { ServiceAreaPage } from '@/sections/services/ServiceAreaPage'
import { ServicePageSkeleton } from '@/sections/services/ServicePageSkeleton'

/** One page per service × area from content. */
export function generateStaticParams() {
  const params = SERVICE_CATEGORIES.flatMap((service) =>
    AREAS.map((area) => ({ slug: service.slug, area: area.slug }))
  )
  return params.length > 0 ? params : [{ slug: EMPTY_PARAM, area: EMPTY_PARAM }]
}

const resolve = (slug: string, areaSlug: string) => {
  const service = getServiceCategory(slug)
  const area = getAreaBySlug(areaSlug)
  return service && area ? { service, area } : undefined
}

export async function generateMetadata({
  params,
}: PageProps<'/services/[slug]/areas/[area]'>): Promise<Metadata> {
  const { slug, area: areaSlug } = await params
  const page = resolve(slug, areaSlug)
  if (!page) {
    return {}
  }
  const { service, area } = page
  const path = getServiceAreaHref(service.slug, area.slug)
  const title = SERVICE_PAGE_COPY.area.title(service.title, area.name)
  const description = SERVICE_PAGE_COPY.area.metaDescription(
    service.title,
    area.name
  )
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: [{ url: service.image.src, alt: service.image.alt }],
    },
  }
}

type AreaParams = PageProps<'/services/[slug]/areas/[area]'>['params']

/** Reads params inside <Suspense> so client navigations stay instant. */
const AreaContent = async ({ params }: { params: AreaParams }) => {
  const { slug, area } = await params
  const page = resolve(slug, area)
  if (!page) {
    notFound()
  }
  return <ServiceAreaPage {...page} />
}

export default function ServiceAreaRoute({
  params,
}: PageProps<'/services/[slug]/areas/[area]'>) {
  return (
    <Suspense fallback={<ServicePageSkeleton />}>
      <AreaContent params={params} />
    </Suspense>
  )
}
