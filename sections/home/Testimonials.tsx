'use client'

import * as React from 'react'
import { cn } from 'cn'
import { QuoteIcon, StarIcon } from 'lucide-react'

import { CarouselControls } from '@/components/shared/CarouselControls'
import { ContactActions } from '@/components/shared/ContactActions'
import { SectionHeading } from '@/components/shared/SectionHeading'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { TESTIMONIALS_SECTION } from '@/content/home'
import { TESTIMONIALS } from '@/content/testimonials'
import { useAutoplay, useCarouselIndex } from '@/hooks/useAutoplay'
import { getInitials } from '@/lib/format'

const MAX_RATING = 5

const Stars = ({ rating }: { rating: number }) => (
  <div
    className="flex gap-0.5"
    role="img"
    aria-label={`Rated ${rating} out of ${MAX_RATING}`}
  >
    {Array.from({ length: MAX_RATING }, (_, index) => (
      <StarIcon
        key={index}
        aria-hidden
        className={cn(
          'size-4',
          index < rating ? 'fill-warning text-warning' : 'fill-muted text-muted'
        )}
      />
    ))}
  </div>
)

export const Testimonials = ({ className }: { className?: string }) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const autoplay = useAutoplay(api, { delay: 7000 })
  const { selected, count } = useCarouselIndex(api, TESTIMONIALS.length)

  return (
    <section
      className={cn('section', className)}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="testimonials-heading"
            eyebrow={TESTIMONIALS_SECTION.eyebrow}
            title={TESTIMONIALS_SECTION.title}
            align="start"
          />
          <CarouselControls
            api={api}
            selected={selected}
            count={count}
            itemLabel="review"
            autoplay={autoplay}
            className="hidden md:flex"
          />
        </div>

        <div className="mt-10" {...autoplay.pauseHandlers}>
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: 'start' }}
            aria-label="Customer reviews"
          >
            <CarouselContent className="py-2">
              {TESTIMONIALS.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.id}
                  className="md:basis-1/2 lg:basis-1/3"
                  aria-label={`${index + 1} of ${TESTIMONIALS.length}`}
                >
                  <figure className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-heading/5">
                    <div className="flex items-center justify-between">
                      <Stars rating={testimonial.rating} />
                      <QuoteIcon
                        className="size-8 text-primary/20 rtl:-scale-x-100"
                        aria-hidden
                      />
                    </div>
                    <blockquote className="mt-4 flex-1 text-foreground">
                      <p>“{testimonial.quote}”</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
                      <span
                        aria-hidden
                        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-muted font-heading font-bold text-primary-muted-foreground"
                      >
                        {getInitials(testimonial.name)}
                      </span>
                      <span className="flex flex-col">
                        <span className="font-semibold text-heading">
                          {testimonial.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {testimonial.service} · {testimonial.area}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="mt-8 flex flex-col items-center gap-8 md:items-start">
          <CarouselControls
            api={api}
            selected={selected}
            count={count}
            itemLabel="review"
            autoplay={autoplay}
            className="md:hidden"
          />
          <ContactActions actions={['whatsapp']} />
        </div>
      </div>
    </section>
  )
}
