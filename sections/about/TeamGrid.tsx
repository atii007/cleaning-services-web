import Image from 'next/image'
import { cn } from 'cn'

import { Reveal } from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { getInitials } from '@/lib/format'
import type { SectionCopy, TeamMember } from '@/types/content'

type TeamGridProps = {
  heading: SectionCopy
  members: TeamMember[]
  className?: string
}

/** Team cards: a photo when content has one, initials otherwise. */
export const TeamGrid = ({ heading, members, className }: TeamGridProps) => (
  <section className={cn('section', className)} aria-labelledby="team-heading">
    <div className="container-page">
      <SectionHeading
        id="team-heading"
        eyebrow={heading.eyebrow}
        title={heading.title}
        description={heading.description}
      />
      <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {members.map((member, index) => (
          <li key={member.name}>
            <Reveal
              delay={(index % 4) * 0.08}
              className="flex h-full flex-col items-center rounded-2xl border bg-card p-4 text-center sm:p-6"
            >
              {member.image ? (
                <span className="relative size-24 overflow-hidden rounded-full sm:size-28">
                  <Image
                    src={member.image.src}
                    alt={member.image.alt}
                    fill
                    sizes="7rem"
                    className="object-cover"
                  />
                </span>
              ) : (
                <span
                  aria-hidden
                  className="inline-flex size-24 items-center justify-center rounded-full bg-primary-muted font-heading text-2xl font-bold text-primary-muted-foreground sm:size-28"
                >
                  {getInitials(member.name)}
                </span>
              )}
              <h3 className="mt-4 text-base font-bold sm:text-lg">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {member.role}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
