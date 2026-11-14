import { cn } from 'cn'

import { Reveal } from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import type { Milestone, SectionCopy } from '@/types/content'

type MilestonesProps = {
  heading: SectionCopy
  milestones: Milestone[]
  className?: string
}

/** Vertical timeline; the line sits on the inline-start side (RTL-safe). */
export const Milestones = ({
  heading,
  milestones,
  className,
}: MilestonesProps) => (
  <section
    className={cn('section', className)}
    aria-labelledby="milestones-heading"
  >
    <div className="container-page grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
      <SectionHeading
        id="milestones-heading"
        eyebrow={heading.eyebrow}
        title={heading.title}
        description={heading.description}
        align="start"
        className="lg:sticky lg:top-28 lg:self-start"
      />
      <ol className="space-y-8 border-s-2 border-primary/20 ps-8">
        {milestones.map((milestone, index) => (
          <li key={`${milestone.year}-${milestone.title}`} className="relative">
            <span
              aria-hidden
              className="absolute -start-[2.6rem] top-1 size-4 rounded-full border-4 border-background bg-primary ring-2 ring-primary/30"
            />
            <Reveal delay={index * 0.06}>
              <p className="eyebrow">{milestone.year}</p>
              <h3 className="mt-1 text-xl font-bold">{milestone.title}</h3>
              <p className="mt-2 text-muted-foreground">
                {milestone.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
)
