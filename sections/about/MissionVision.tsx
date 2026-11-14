import { cn } from 'cn'

import { Icon } from '@/components/shared/Icon'
import { Reveal } from '@/components/shared/Reveal'
import type { AboutCard } from '@/types/content'

type MissionVisionProps = {
  cards: AboutCard[]
  className?: string
}

/** Mission / vision statements as side-by-side cards. */
export const MissionVision = ({ cards, className }: MissionVisionProps) => (
  <section className={cn('section', className)} aria-label="Mission and vision">
    <ul className="container-page grid gap-6 md:grid-cols-2">
      {cards.map((card, index) => (
        <li key={card.title}>
          <Reveal
            delay={index * 0.1}
            className="relative isolate h-full overflow-hidden rounded-3xl border bg-card p-8 sm:p-10"
          >
            <div
              aria-hidden
              className="absolute -end-16 -top-16 -z-10 size-48 rounded-full bg-primary/10 blur-2xl"
            />
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Icon name={card.icon} className="size-7" />
            </span>
            <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
              {card.title}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              {card.description}
            </p>
          </Reveal>
        </li>
      ))}
    </ul>
  </section>
)
