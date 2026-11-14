import Image from 'next/image'
import { cn } from 'cn'
import { CheckCircle2Icon } from 'lucide-react'

import { Paragraphs } from '@/components/shared/Paragraphs'
import { Reveal } from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { SERVICE_PAGE_COPY } from '@/content/service-page'
import { formatPrice } from '@/lib/format'
import type { ServiceCategory } from '@/types/content'

type ServiceIntroProps = {
  intro: NonNullable<ServiceCategory['intro']>
  eyebrow: string
  startingPrice?: number
  className?: string
}

export const ServiceIntro = ({
  intro,
  eyebrow,
  startingPrice,
  className,
}: ServiceIntroProps) => (
  <section className={cn('section', className)} aria-labelledby="intro-heading">
    <div
      className={cn(
        'container-page grid items-center gap-12',
        intro.image && 'lg:grid-cols-2 lg:gap-16'
      )}
    >
      <div>
        <SectionHeading
          id="intro-heading"
          eyebrow={eyebrow}
          title={intro.title}
          align="start"
        />
        <Paragraphs
          items={intro.paragraphs}
          className="mt-6 text-muted-foreground"
        />
        {intro.bullets && intro.bullets.length > 0 ? (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {intro.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5">
                <CheckCircle2Icon
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  aria-hidden
                />
                <span className="font-medium text-heading">{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {intro.image ? (
        <Reveal className="relative">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
            <Image
              src={intro.image.src}
              alt={intro.image.alt}
              fill
              loading="eager"
              sizes="(min-width: 64rem) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          {startingPrice !== undefined ? (
            <p className="absolute start-6 -bottom-5 rounded-2xl border bg-card px-5 py-3 shadow-xl shadow-heading/10">
              <span className="block text-xs text-muted-foreground">
                {SERVICE_PAGE_COPY.startingFrom}
              </span>
              <span className="font-heading text-2xl font-extrabold text-primary">
                {formatPrice(startingPrice)}
              </span>
            </p>
          ) : null}
        </Reveal>
      ) : null}
    </div>
  </section>
)
