import { type NextRequest, NextResponse } from 'next/server'

import { STATIC_TOP_LEVEL_SEGMENTS } from '@/constants/routes'
import { getAllBlogPaths } from '@/content/blog'
import { getAllPolicyPaths } from '@/content/policies'
import { getAllServicePaths } from '@/content/services'

/**
 * Real 404s for unknown content URLs.
 *
 * Dynamic pages read their params inside <Suspense>, so an unknown slug would
 * otherwise stream the not-found UI with a 200 status (and `dynamicParams`
 * is unavailable with Cache Components). The set of valid paths is derived
 * from content, so it never needs updating by hand.
 */
const VALID_PATHS = new Set([
  ...STATIC_TOP_LEVEL_SEGMENTS.map((segment) => `/${segment}`),
  ...getAllServicePaths(),
  ...getAllBlogPaths(),
  ...getAllPolicyPaths(),
])

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, '') || '/'
  if (VALID_PATHS.has(path)) {
    return NextResponse.next()
  }
  return NextResponse.rewrite(new URL('/_not-found', request.url))
}

export const config = {
  matcher: [
    '/services',
    '/services/:path*',
    '/blog',
    '/blog/:path*',
    // Single top-level segments (policy pages share this level). Skips files
    // (anything with a dot) and Next's dev-server endpoints (`__nextjs_*`).
    '/((?!__nextjs)[^/.]+)',
  ],
}
