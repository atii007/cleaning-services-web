'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from 'cn'
import { ChevronsLeftRightIcon } from 'lucide-react'

import type { ImageAsset } from '@/types/content'

type BeforeAfterSliderProps = {
  before: ImageAsset
  after: ImageAsset
  /** Names the comparison for screen readers. */
  title: string
  sizes: string
  className?: string
}

const LABEL_CLASS =
  'pointer-events-none absolute top-4 rounded-full bg-overlay/70 px-3 py-1 text-xs font-semibold tracking-wide text-overlay-foreground uppercase backdrop-blur-sm'

/**
 * Drag-to-compare image slider. A transparent native range input covers the
 * image, so mouse, touch, keyboard and screen readers all work without
 * custom gesture code. `--pos` is measured from the inline-start edge, which
 * keeps it correct in RTL (where the range input also runs right-to-left).
 */
export const BeforeAfterSlider = ({
  before,
  after,
  title,
  sizes,
  className,
}: BeforeAfterSliderProps) => {
  const [position, setPosition] = React.useState(50)

  return (
    <div
      className={cn(
        'group relative isolate aspect-3/2 overflow-hidden rounded-2xl bg-muted select-none',
        className
      )}
      style={{ '--pos': `${position}%` } as React.CSSProperties}
    >
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
      <div className="absolute inset-0 [clip-path:inset(0_calc(100%-var(--pos))_0_0)] rtl:[clip-path:inset(0_0_0_calc(100%-var(--pos)))]">
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>

      <span className={cn(LABEL_CLASS, 'start-4')} aria-hidden>
        Before
      </span>
      <span className={cn(LABEL_CLASS, 'end-4')} aria-hidden>
        After
      </span>

      {/* Decorative divider + handle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 start-(--pos) w-0.5 -translate-x-1/2 bg-overlay-foreground shadow-[0_0_12px_rgb(0_0_0/0.35)] rtl:translate-x-1/2"
      >
        <span className="absolute top-1/2 left-1/2 inline-flex size-11 -translate-1/2 items-center justify-center rounded-full bg-overlay-foreground text-heading shadow-lg ring-primary/50 transition-transform group-hover:scale-110 group-has-[input:focus-visible]:ring-4 motion-reduce:transition-none">
          <ChevronsLeftRightIcon className="size-5" />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={`Before and after comparison: ${title}`}
        aria-valuetext={`${position}% before shown`}
        className="absolute inset-0 size-full cursor-ew-resize touch-pan-y appearance-none opacity-0"
      />
    </div>
  )
}
