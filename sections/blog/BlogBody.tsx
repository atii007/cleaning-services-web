import Image from 'next/image'
import { CheckCircle2Icon, InfoIcon, QuoteIcon } from 'lucide-react'

import type { BlogBlock } from '@/types/content'

/**
 * Renders an article body from typed content blocks. Blocks never reorder,
 * so their position is a stable key (text can repeat).
 */
export const BlogBody = ({ blocks }: { blocks: readonly BlogBlock[] }) => (
  <div className="space-y-6 text-lg leading-relaxed text-foreground">
    {blocks.map((block, index) => {
      const key = index
      switch (block.type) {
        case 'heading':
          return (
            <h2 key={key} className="pt-4 text-2xl font-bold sm:text-3xl">
              {block.text}
            </h2>
          )
        case 'paragraph':
          return <p key={key}>{block.text}</p>
        case 'list': {
          const ListTag = block.ordered ? 'ol' : 'ul'
          return (
            <ListTag
              key={key}
              className={
                block.ordered
                  ? 'list-decimal space-y-2 ps-6 marker:font-semibold marker:text-primary'
                  : 'space-y-3'
              }
            >
              {block.items.map((item) =>
                block.ordered ? (
                  <li key={item} className="ps-1">
                    {item}
                  </li>
                ) : (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2Icon
                      className="mt-1 size-5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ListTag>
          )
        }
        case 'image':
          return (
            <figure key={key}>
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src={block.image.src}
                  alt={block.image.alt}
                  fill
                  sizes="(min-width: 48rem) 48rem, 100vw"
                  className="object-cover"
                />
              </div>
              {block.caption ? (
                <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                  {block.caption}
                </figcaption>
              ) : null}
            </figure>
          )
        case 'quote':
          return (
            <figure
              key={key}
              className="relative rounded-2xl border-s-4 border-primary bg-primary-muted/40 p-6 sm:p-8"
            >
              <QuoteIcon
                className="absolute end-6 top-6 size-8 text-primary/20 rtl:-scale-x-100"
                aria-hidden
              />
              <blockquote className="font-heading text-xl font-semibold text-heading">
                <p>“{block.text}”</p>
              </blockquote>
              {block.cite ? (
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  — {block.cite}
                </figcaption>
              ) : null}
            </figure>
          )
        case 'callout':
          return (
            <aside
              key={key}
              className="flex gap-4 rounded-2xl border bg-surface p-6"
            >
              <InfoIcon
                className="mt-1 size-6 shrink-0 text-primary"
                aria-hidden
              />
              <div>
                {block.title ? (
                  <p className="font-heading font-bold text-heading">
                    {block.title}
                  </p>
                ) : null}
                <p className="text-base">{block.text}</p>
              </div>
            </aside>
          )
      }
    })}
  </div>
)
