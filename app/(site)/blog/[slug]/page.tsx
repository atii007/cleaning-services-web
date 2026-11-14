import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleSkeleton } from '@/components/shared/ArticleSkeleton'
import { BLOG_POSTS, getBlogHref, getPostBySlug } from '@/content/blog'
import { EMPTY_PARAM } from '@/content/services'
import { BlogArticle } from '@/sections/blog/BlogArticle'

/** One page per post in content/blog.ts. */
export function generateStaticParams() {
  return BLOG_POSTS.length > 0
    ? BLOG_POSTS.map((post) => ({ slug: post.slug }))
    : [{ slug: EMPTY_PARAM }]
}

export async function generateMetadata({
  params,
}: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) {
    return {}
  }
  const path = getBlogHref(post.slug)
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: path,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      section: post.category,
      tags: post.tags,
      images: [{ url: post.image.src, alt: post.image.alt }],
    },
  }
}

type PostParams = PageProps<'/blog/[slug]'>['params']

/** Reads params inside <Suspense> so client navigations stay instant. */
const PostContent = async ({ params }: { params: PostParams }) => {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) {
    notFound()
  }
  return <BlogArticle post={post} />
}

export default function BlogPostRoute({ params }: PageProps<'/blog/[slug]'>) {
  return (
    <Suspense fallback={<ArticleSkeleton label="Loading article…" />}>
      <PostContent params={params} />
    </Suspense>
  )
}
