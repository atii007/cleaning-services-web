'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLinkProps = React.ComponentProps<typeof Link> & {
  href: string
  /** Match only the exact path (default for `/`). */
  exact?: boolean
}

const isActivePath = (pathname: string, href: string, exact: boolean) => {
  if (exact || href === '/') {
    return pathname === href
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

const ActiveLink = ({ href, exact = false, ...props }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = isActivePath(pathname, href, exact)

  return (
    <Link
      href={href}
      aria-current={pathname === href ? 'page' : undefined}
      data-active={isActive ? '' : undefined}
      {...props}
    />
  )
}

/**
 * `next/link` that marks itself active (`data-active`, `aria-current`) for
 * the current route. Style the active state with `data-active:*`.
 *
 * `usePathname` can suspend under Cache Components on routes with unknown
 * dynamic params, so the link carries its own Suspense boundary.
 */
export const NavLink = ({ exact, ...props }: NavLinkProps) => (
  <React.Suspense fallback={<Link {...props} />}>
    <ActiveLink exact={exact} {...props} />
  </React.Suspense>
)
