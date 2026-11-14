'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2Icon, XIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { PROMO_OFFER } from '@/content/promo'

const STORAGE_KEY = `promo-dismissed:${PROMO_OFFER.id}`

const wasDismissed = (): boolean => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

const markDismissed = () => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Storage blocked (private mode, disabled cookies) — the popup may
    // reappear on the next page load, which is acceptable.
  }
}

const isExcludedPath = (pathname: string): boolean =>
  PROMO_OFFER.excludedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

const RETRY_MS = 4000

const isOtherOverlayOpen = (): boolean =>
  document.querySelector(
    '[role="dialog"], [data-slot="navigation-menu-viewport"][data-state="open"]'
  ) !== null

/**
 * Special-offer popup. Opens once per browser session after a short delay,
 * never on excluded routes, and stays closed once dismissed.
 */
export const PromoDialog = () => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!PROMO_OFFER.enabled || wasDismissed()) {
      return
    }
    let timer = 0
    const tryOpen = () => {
      if (isExcludedPath(window.location.pathname)) {
        return
      }
      // Never interrupt a visitor who has the drawer or a menu open —
      // check again a little later instead.
      if (isOtherOverlayOpen()) {
        timer = window.setTimeout(tryOpen, RETRY_MS)
        return
      }
      setOpen(true)
    }
    timer = window.setTimeout(tryOpen, PROMO_OFFER.delayMs)
    return () => window.clearTimeout(timer)
  }, [])

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      markDismissed()
    }
  }

  const { eyebrow, title, description, highlights, image, cta } = PROMO_OFFER

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden p-0 sm:max-w-3xl"
      >
        <DialogClose asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute end-3 top-3 z-10 rounded-full bg-background/90 shadow-sm"
          >
            <XIcon aria-hidden />
            <span className="sr-only">Close offer</span>
          </Button>
        </DialogClose>
        <div className="grid sm:grid-cols-2">
          <div className="relative aspect-video sm:aspect-auto">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 40rem) 24rem, 100vw"
              className="object-cover"
            />
            <Badge className="absolute start-4 top-4 bg-highlight text-highlight-foreground">
              {eyebrow}
            </Badge>
          </div>
          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <DialogTitle className="font-heading text-2xl font-bold text-heading sm:text-3xl">
              {title}
            </DialogTitle>
            <DialogDescription className="text-base">
              {description}
            </DialogDescription>
            <ul className="space-y-2 text-sm">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <CheckCircle2Icon
                    className="size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  {highlight}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-2 h-12 text-base">
              <Link href={cta.href} onClick={() => handleOpenChange(false)}>
                {cta.label}
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
