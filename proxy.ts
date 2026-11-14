import { type NextRequest, NextResponse } from 'next/server'

import { getAllServicePaths } from '@/content/services'

/**
 * Real 404s for unknown service URLs.
 *
 * Service pages read their params inside <Suspense>, so an unknown slug would
 * otherwise stream the not-found UI with a 200 status. The set of valid paths
 * is derived from content, so it never needs updating by hand.
 */
const VALID_PATHS = new Set(getAllServicePaths())

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, '') || '/'
  if (VALID_PATHS.has(path)) {
    return NextResponse.next()
  }
  return NextResponse.rewrite(new URL('/_not-found', request.url))
}

export const config = {
  matcher: ['/services', '/services/:path*'],
}
