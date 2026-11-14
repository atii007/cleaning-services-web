'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from 'cn'
import { MapPinIcon, MoveHorizontalIcon } from 'lucide-react'

import { BeforeAfterSlider } from '@/components/shared/BeforeAfterSlider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { BEFORE_AFTER_ITEMS } from '@/content/gallery'
import { SERVICE_CATEGORIES } from '@/content/services'

type GalleryItem = (typeof BEFORE_AFTER_ITEMS)[number]

const FILTERS = [
  { value: 'all', label: 'All' },
  ...SERVICE_CATEGORIES.map((service) => ({
    value: service.slug,
    label: service.title,
  })),
]

/** Filterable before/after grid; each card opens a comparison lightbox. */
export const GalleryGrid = () => {
  const [filter, setFilter] = React.useState('all')
  const [active, setActive] = React.useState<GalleryItem | null>(null)

  const items =
    filter === 'all'
      ? BEFORE_AFTER_ITEMS
      : BEFORE_AFTER_ITEMS.filter((item) => item.service === filter)

  return (
    <div>
      <div
        role="group"
        aria-label="Filter results by service"
        className="flex flex-wrap justify-center gap-2"
      >
        {FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
              filter === option.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'bg-background hover:border-primary hover:text-primary'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setActive(item)}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl text-start focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Image
                src={item.after.src}
                alt=""
                fill
                sizes="(min-width: 64rem) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-overlay via-overlay/20 to-transparent"
              />
              <span className="absolute end-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-overlay-foreground/90 text-heading opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <MoveHorizontalIcon className="size-4" aria-hidden />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <span className="block text-sm font-semibold text-overlay-foreground sm:text-base">
                  {item.title}
                </span>
                <span className="mt-0.5 hidden items-center gap-1 text-xs text-overlay-foreground/80 sm:inline-flex">
                  <MapPinIcon className="size-3" aria-hidden />
                  {item.location}
                </span>
                <span className="sr-only">
                  , open before and after comparison
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) {
            setActive(null)
          }
        }}
      >
        <DialogContent className="gap-4 p-3 sm:max-w-4xl sm:p-4">
          {active ? (
            <>
              <BeforeAfterSlider
                before={active.before}
                after={active.after}
                title={active.title}
                sizes="(min-width: 56rem) 56rem, 100vw"
              />
              <div className="px-1 pb-1">
                <DialogTitle className="font-heading text-lg font-semibold text-heading">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="inline-flex items-center gap-1">
                  <MapPinIcon className="size-3.5" aria-hidden />
                  {active.location} · Drag or use arrow keys to compare
                </DialogDescription>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
