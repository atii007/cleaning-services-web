import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import {
  Clock3Icon,
  LeafIcon,
  ShieldCheckIcon,
  ThumbsUpIcon,
} from 'lucide-react'

import { CountUp } from '@/components/shared/CountUp'
import { Reveal } from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import {
  STATS,
  TRUST_POINTS,
  WHY_US_IMAGE,
  WHY_US_SECTION,
} from '@/content/home'
import type { TrustPointIcon } from '@/types/content'

const TRUST_ICONS: Record<TrustPointIcon, LucideIcon> = {
  shield: ShieldCheckIcon,
  leaf: LeafIcon,
  clock: Clock3Icon,
  'thumbs-up': ThumbsUpIcon,
}

export const WhyChooseUs = () => (
  <section className="section" aria-labelledby="why-us-heading">
    <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal className="relative">
        <div className="relative aspect-4/5 overflow-hidden rounded-3xl sm:aspect-4/3 lg:aspect-4/5">
          <Image
            src={WHY_US_IMAGE.src}
            alt={WHY_US_IMAGE.alt}
            fill
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        {/* Floating rating card */}
        <div className="absolute start-6 -bottom-6 rounded-2xl border bg-card p-5 shadow-xl shadow-heading/10 sm:start-auto sm:-end-6">
          <p className="font-heading text-4xl font-extrabold text-primary">
            <CountUp value={STATS[2].value} decimals={STATS[2].decimals} />
            <span className="text-2xl text-muted-foreground">
              {STATS[2].suffix}
            </span>
          </p>
          <p className="mt-1 text-sm font-medium text-heading">
            {STATS[2].label}
          </p>
        </div>
      </Reveal>

      <div>
        <SectionHeading
          id="why-us-heading"
          eyebrow={WHY_US_SECTION.eyebrow}
          title={WHY_US_SECTION.title}
          description={WHY_US_SECTION.description}
          align="start"
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {TRUST_POINTS.map((point, index) => {
            const Icon = TRUST_ICONS[point.icon]
            return (
              <li key={point.title}>
                <Reveal delay={index * 0.08} className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-muted text-primary-muted-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{point.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse bg-card p-5">
              <dt className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="font-heading text-2xl font-extrabold text-heading">
                <CountUp
                  value={stat.value}
                  decimals={'decimals' in stat ? stat.decimals : 0}
                />
                <span className="text-primary">{stat.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
)
