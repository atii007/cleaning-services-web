import { cn } from 'cn'

type SectionHeadingProps = {
  title: string
  eyebrow?: string
  description?: string
  /** Use `h1` only for the single page-level heading. */
  as?: 'h1' | 'h2'
  align?: 'start' | 'center'
  /** Lets a section reference the heading via `aria-labelledby`. */
  id?: string
  /** Light text for use on `inverse` or `overlay` backgrounds. */
  inverse?: boolean
  className?: string
}

/** Eyebrow + title + description block used to open every section. */
export const SectionHeading = ({
  title,
  eyebrow,
  description,
  as: Heading = 'h2',
  align = 'center',
  id,
  inverse = false,
  className,
}: SectionHeadingProps) => (
  <div
    className={cn(
      'max-w-2xl',
      align === 'center' && 'mx-auto text-center',
      className
    )}
  >
    {eyebrow ? (
      <p className={cn('eyebrow', inverse && 'text-primary-light')}>
        {eyebrow}
      </p>
    ) : null}
    <Heading
      id={id}
      className={cn(
        'mt-2 font-bold',
        Heading === 'h1'
          ? 'text-4xl sm:text-5xl lg:text-6xl'
          : 'text-3xl sm:text-4xl',
        inverse && 'text-overlay-foreground'
      )}
    >
      {title}
    </Heading>
    {description ? (
      <p
        className={cn(
          'mt-4 text-lg',
          inverse ? 'text-overlay-foreground/80' : 'text-muted-foreground'
        )}
      >
        {description}
      </p>
    ) : null}
  </div>
)
