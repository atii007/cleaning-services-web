import Image from 'next/image'
import { cn } from 'cn'
import { CheckIcon } from 'lucide-react'

import { Paragraphs } from '@/components/shared/Paragraphs'
import { Reveal } from '@/components/shared/Reveal'
import type { ContentBlock } from '@/types/content'

type ServiceContentBlocksProps = {
  blocks: ContentBlock[]
  className?: string
}

/** Alternating image / text rows. Blocks without an image go full width. */
export const ServiceContentBlocks = ({
  blocks,
  className,
}: ServiceContentBlocksProps) => (
  <div className={cn('section', className)}>
    <div className="container-page space-y-16 lg:space-y-24">
      {blocks.map((block, index) => (
        <section
          key={block.title}
          aria-label={block.title}
          className={cn(
            'grid items-center gap-10',
            block.image && 'lg:grid-cols-2 lg:gap-16'
          )}
        >
          {block.image ? (
            <Reveal className={cn(index % 2 === 1 && 'lg:order-last')}>
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
                <Image
                  src={block.image.src}
                  alt={block.image.alt}
                  fill
                  sizes="(min-width: 64rem) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ) : null}
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{block.title}</h2>
            <Paragraphs
              items={block.paragraphs}
              className="mt-4 text-muted-foreground"
            />
            {block.bullets && block.bullets.length > 0 ? (
              <ul className="mt-6 space-y-3">
                {block.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckIcon className="size-3" aria-hidden />
                    </span>
                    <span className="text-heading">{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  </div>
)
