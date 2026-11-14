import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleSkeleton } from '@/components/shared/ArticleSkeleton'
import { getPolicyBySlug, getPolicyHref, POLICIES } from '@/content/policies'
import { EMPTY_PARAM } from '@/content/services'
import { PolicyPage } from '@/sections/legal/PolicyPage'

/**
 * One top-level page per policy in content/policies.ts. Unknown top-level
 * paths get a real 404 from proxy.ts before reaching this route.
 */
export function generateStaticParams() {
  return POLICIES.length > 0
    ? POLICIES.map((policy) => ({ policy: policy.slug }))
    : [{ policy: EMPTY_PARAM }]
}

export async function generateMetadata({
  params,
}: PageProps<'/[policy]'>): Promise<Metadata> {
  const { policy: slug } = await params
  const policy = getPolicyBySlug(slug)
  if (!policy) {
    return {}
  }
  const path = getPolicyHref(policy.slug)
  return {
    title: policy.title,
    description: policy.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: policy.title,
      description: policy.metaDescription,
      url: path,
    },
  }
}

type PolicyParams = PageProps<'/[policy]'>['params']

/** Reads params inside <Suspense> so client navigations stay instant. */
const PolicyContent = async ({ params }: { params: PolicyParams }) => {
  const { policy: slug } = await params
  const policy = getPolicyBySlug(slug)
  if (!policy) {
    notFound()
  }
  return <PolicyPage policy={policy} />
}

export default function PolicyRoute({ params }: PageProps<'/[policy]'>) {
  return (
    <Suspense fallback={<ArticleSkeleton label="Loading page…" />}>
      <PolicyContent params={params} />
    </Suspense>
  )
}
