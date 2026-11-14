import { cn } from 'cn'
import { CheckCircle2Icon } from 'lucide-react'

import { PageHero } from '@/components/shared/PageHero'
import { Paragraphs } from '@/components/shared/Paragraphs'
import { getPolicyHref, POLICY_PAGE } from '@/content/policies'
import { formatDate } from '@/lib/format'
import { slugify } from '@/lib/slug'
import type { Policy } from '@/types/content'

/** Anchor ids come from headings; the index keeps them unique. */
const getSectionId = (heading: string, index: number) =>
  `${index + 1}-${slugify(heading)}`

/** A legal page: hero, table of contents and numbered sections. */
export const PolicyPage = ({ policy }: { policy: Policy }) => {
  const hasContents = policy.sections.length > 1

  return (
    <>
      <PageHero
        eyebrow={POLICY_PAGE.eyebrow}
        title={policy.title}
        description={policy.intro}
        image={POLICY_PAGE.image}
        breadcrumbs={[
          { label: policy.title, href: getPolicyHref(policy.slug) },
        ]}
        actions={
          <p className="text-sm text-overlay-foreground/85">
            {POLICY_PAGE.updated}{' '}
            <time dateTime={policy.updatedAt}>
              {formatDate(policy.updatedAt)}
            </time>
          </p>
        }
      />

      <div className="section">
        <div
          className={cn(
            'container-page grid gap-10',
            hasContents && 'lg:grid-cols-[1fr_3fr] lg:gap-16'
          )}
        >
          {hasContents ? (
            <nav
              aria-labelledby="policy-contents-heading"
              className="rounded-2xl border bg-surface p-6 lg:sticky lg:top-28 lg:self-start"
            >
              <h2
                id="policy-contents-heading"
                className="text-sm font-semibold tracking-wider uppercase"
              >
                {POLICY_PAGE.contents}
              </h2>
              <ol className="mt-4 space-y-2 text-sm">
                {policy.sections.map((section, index) => (
                  <li key={section.heading}>
                    <a
                      href={`#${getSectionId(section.heading, index)}`}
                      className="flex gap-2 text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span className="font-semibold text-primary">
                        {index + 1}.
                      </span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div
            className={cn(
              'max-w-3xl space-y-12',
              hasContents ? 'lg:col-start-2' : 'mx-auto w-full'
            )}
          >
            {policy.sections.map((section, index) => (
              <section
                key={section.heading}
                id={getSectionId(section.heading, index)}
                aria-labelledby={`${getSectionId(section.heading, index)}-heading`}
                className="scroll-mt-28"
              >
                <h2
                  id={`${getSectionId(section.heading, index)}-heading`}
                  className="text-2xl font-bold"
                >
                  <span className="text-primary">{index + 1}.</span>{' '}
                  {section.heading}
                </h2>
                <Paragraphs
                  items={section.paragraphs}
                  className="mt-4 text-lg leading-relaxed text-muted-foreground"
                />
                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <CheckCircle2Icon
                          className="mt-0.5 size-5 shrink-0 text-primary"
                          aria-hidden
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
