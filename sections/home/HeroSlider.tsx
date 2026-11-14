'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from 'cn'
import { CheckCircle2Icon } from 'lucide-react'

import { CarouselControls } from '@/components/shared/CarouselControls'
import { ContactActions } from '@/components/shared/ContactActions'
import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { HERO_HIGHLIGHTS, HERO_SLIDES } from '@/content/home'
import { useAutoplay, useCarouselIndex } from '@/hooks/useAutoplay'

const TITLE_CLASS =
  'font-heading text-4xl font-extrabold tracking-tight text-balance text-overlay-foreground sm:text-5xl lg:text-6xl'

/**
 * Full-bleed hero carousel. Slide 1 carries the page's only <h1> and the
 * LCP image; the other slides use visually identical <p> headings.
 */
export const HeroSlider = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const autoplay = useAutoplay(api)
  const { selected, count } = useCarouselIndex(api, HERO_SLIDES.length)

  return (
    // The carousel itself is the labelled region, so the wrapper is a div.
    <div className="relative isolate bg-inverse" {...autoplay.pauseHandlers}>
      <Carousel
        setApi={setApi}
        opts={{ loop: true, duration: 32 }}
        aria-label="Featured services"
      >
        <CarouselContent className="ms-0">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === selected
            return (
              <CarouselItem
                key={slide.id}
                className="relative ps-0"
                aria-label={`${index + 1} of ${HERO_SLIDES.length}`}
                inert={!isActive}
              >
                <div className="relative isolate flex min-h-[38rem] items-center sm:min-h-[40rem] lg:min-h-[44rem]">
                  <Image
                    src={slide.image.src}
                    alt=""
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="-z-20 object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-linear-to-r from-overlay via-overlay/85 to-overlay/30 rtl:bg-linear-to-l"
                  />
                  <div className="container-page pt-16 pb-36 sm:pb-32">
                    <div
                      className={cn(
                        'max-w-2xl',
                        isActive &&
                          'motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in motion-safe:slide-in-from-bottom-4'
                      )}
                    >
                      <Badge className="bg-highlight text-highlight-foreground">
                        {slide.eyebrow}
                      </Badge>
                      {index === 0 ? (
                        <h1 className={cn('mt-5', TITLE_CLASS)}>
                          {slide.title}
                        </h1>
                      ) : (
                        <p className={cn('mt-5', TITLE_CLASS)}>{slide.title}</p>
                      )}
                      <p className="mt-5 max-w-xl text-lg text-overlay-foreground/85">
                        {slide.description}
                      </p>
                      <ContactActions
                        actions={['whatsapp', 'quote']}
                        inverse
                        className="mt-8"
                      />
                      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-overlay-foreground/90">
                        {HERO_HIGHLIGHTS.map((highlight) => (
                          <li
                            key={highlight}
                            className="inline-flex items-center gap-2"
                          >
                            <CheckCircle2Icon
                              className="size-4 text-highlight"
                              aria-hidden
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
      <div className="pointer-events-none absolute inset-x-0 bottom-8">
        <div className="container-page">
          <CarouselControls
            api={api}
            selected={selected}
            count={count}
            autoplay={autoplay}
            inverse
            className="pointer-events-auto w-fit"
          />
        </div>
      </div>
    </div>
  )
}
