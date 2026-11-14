'use client'

import { cn } from 'cn'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from 'lucide-react'

import type { CarouselApi } from '@/components/ui/carousel'

type CarouselControlsProps = {
  api: CarouselApi | undefined
  selected: number
  count: number
  /** Used in button labels, e.g. "slide" or "review". */
  itemLabel?: string
  autoplay?: {
    isPlaying: boolean
    canAutoplay: boolean
    toggle: () => void
  }
  /** Light controls for dark / photo backgrounds. */
  inverse?: boolean
  className?: string
}

/** Dots, previous / next and an optional pause toggle for a carousel. */
export const CarouselControls = ({
  api,
  selected,
  count,
  itemLabel = 'slide',
  autoplay,
  inverse = false,
  className,
}: CarouselControlsProps) => {
  const buttonClass = cn(
    'inline-flex size-10 items-center justify-center rounded-full border transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
    inverse
      ? 'border-overlay-foreground/30 text-overlay-foreground hover:bg-overlay-foreground/15'
      : 'bg-background text-heading hover:border-primary hover:text-primary'
  )

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        type="button"
        className={buttonClass}
        onClick={() => api?.scrollPrev()}
        aria-label={`Previous ${itemLabel}`}
      >
        <ChevronLeftIcon className="size-5 rtl:rotate-180" aria-hidden />
      </button>
      <ol className="flex items-center gap-1">
        {Array.from({ length: count }, (_, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to ${itemLabel} ${index + 1} of ${count}`}
              aria-current={index === selected ? 'true' : undefined}
              className="group inline-flex h-6 items-center px-1 focus-visible:outline-none"
            >
              <span
                className={cn(
                  'block h-2 rounded-full transition-all duration-300 group-focus-visible:ring-3 group-focus-visible:ring-ring/50',
                  index === selected
                    ? 'w-7 bg-primary'
                    : cn(
                        'w-2',
                        inverse
                          ? 'bg-overlay-foreground/40 group-hover:bg-overlay-foreground/70'
                          : 'bg-border group-hover:bg-muted-foreground'
                      )
                )}
              />
            </button>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className={buttonClass}
        onClick={() => api?.scrollNext()}
        aria-label={`Next ${itemLabel}`}
      >
        <ChevronRightIcon className="size-5 rtl:rotate-180" aria-hidden />
      </button>
      {autoplay?.canAutoplay ? (
        <button
          type="button"
          className={buttonClass}
          onClick={autoplay.toggle}
          aria-label={
            autoplay.isPlaying
              ? 'Pause automatic rotation'
              : 'Start automatic rotation'
          }
        >
          {autoplay.isPlaying ? (
            <PauseIcon className="size-4" aria-hidden />
          ) : (
            <PlayIcon className="size-4" aria-hidden />
          )}
        </button>
      ) : null}
    </div>
  )
}
