import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  EMPTY_PARAM,
  getDetailedSubServices,
  getSubServiceHref,
  getSubServicePage,
  SERVICE_CATEGORIES,
} from '@/content/services'
import { ServicePageSkeleton } from '@/sections/services/ServicePageSkeleton'
import { SubServicePage } from '@/sections/services/SubServicePage'

/** One page per sub-service that has a `detail` block in content. */
export function generateStaticParams() {
  const params = SERVICE_CATEGORIES.flatMap((service) =>
    getDetailedSubServices(service).map((sub) => ({
      slug: service.slug,
      sub: sub.slug,
    }))
  )
  return params.length > 0 ? params : [{ slug: EMPTY_PARAM, sub: EMPTY_PARAM }]
}

export async function generateMetadata({
  params,
}: PageProps<'/services/[slug]/[sub]'>): Promise<Metadata> {
  const { slug, sub } = await params
  const page = getSubServicePage(slug, sub)
  if (!page) {
    return {}
  }
  const path = getSubServiceHref(page.service.slug, page.sub.slug)
  const title = `${page.sub.title} — ${page.service.title}`
  const image = page.detail.image ?? page.service.image
  return {
    title,
    description: page.sub.summary,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: page.sub.summary,
      url: path,
      images: [{ url: image.src, alt: image.alt }],
    },
  }
}

type SubParams = PageProps<'/services/[slug]/[sub]'>['params']

/** Reads params inside <Suspense> so client navigations stay instant. */
const SubServiceContent = async ({ params }: { params: SubParams }) => {
  const { slug, sub } = await params
  const page = getSubServicePage(slug, sub)
  if (!page) {
    notFound()
  }
  return <SubServicePage {...page} />
}

export default function SubServiceRoute({
  params,
}: PageProps<'/services/[slug]/[sub]'>) {
  return (
    <Suspense fallback={<ServicePageSkeleton />}>
      <SubServiceContent params={params} />
    </Suspense>
  )
}
