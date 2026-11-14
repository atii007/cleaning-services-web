import { cn } from 'cn'

import { CountUp } from '@/components/shared/CountUp'
import { SectionHeading } from '@/components/shared/SectionHeading'
import type { SectionCopy, Stat } from '@/types/content'

type AboutStatsProps = {
  heading: SectionCopy
  stats: readonly Stat[]
  className?: string
}

/** Large animated numbers, reusing the home page stats. */
export const AboutStats = ({ heading, stats, className }: AboutStatsProps) => (
  <section className={cn('section', className)} aria-labelledby="stats-heading">
    <div className="container-page">
      <SectionHeading
        id="stats-heading"
        eyebrow={heading.eyebrow}
        title={heading.title}
        description={heading.description}
      />
      <dl className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse rounded-2xl border bg-card p-6 text-center"
          >
            <dt className="mt-2 text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="font-heading text-4xl font-extrabold text-heading sm:text-5xl">
              <CountUp value={stat.value} decimals={stat.decimals ?? 0} />
              <span className="text-primary">{stat.suffix}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
)
