import * as React from 'react'
import Link from 'next/link'
import { cn } from 'cn'
import { HomeIcon } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getBreadcrumbJsonLd, serializeJsonLd } from '@/lib/seo'
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types/site'

type BreadcrumbsProps = {
  /** Trail after "Home". The last item is the current page. */
  items: BreadcrumbItemType[]
  /** Light text for use on `overlay` backgrounds. */
  inverse?: boolean
  className?: string
}

/** Visible breadcrumb trail plus matching BreadcrumbList JSON-LD. */
export const Breadcrumbs = ({
  items,
  inverse = false,
  className,
}: BreadcrumbsProps) => {
  const trail = [{ label: 'Home', href: '/' }, ...items]

  return (
    <>
      <Breadcrumb className={className}>
        <BreadcrumbList className={cn(inverse && 'text-overlay-foreground/75')}>
          {trail.map((item, index) => {
            const isCurrent = index === trail.length - 1
            const isHome = index === 0

            return (
              <React.Fragment key={item.href}>
                {index > 0 ? <BreadcrumbSeparator /> : null}
                <BreadcrumbItem>
                  {isCurrent ? (
                    <BreadcrumbPage
                      className={cn(
                        'font-medium',
                        inverse && 'text-overlay-foreground'
                      )}
                    >
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      asChild
                      className={cn(
                        'inline-flex items-center gap-1.5',
                        inverse && 'hover:text-overlay-foreground'
                      )}
                    >
                      <Link href={item.href}>
                        {isHome ? (
                          <HomeIcon className="size-3.5" aria-hidden />
                        ) : null}
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(getBreadcrumbJsonLd(trail)),
        }}
      />
    </>
  )
}
