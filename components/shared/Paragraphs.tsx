import { cn } from 'cn'

/**
 * Renders a static list of copy paragraphs. Paragraph text can repeat (and
 * placeholder copy often shares a prefix), so text is not a safe key; the
 * list never reorders, so the position is a stable one.
 */
export const Paragraphs = ({
  items,
  className,
}: {
  items: readonly string[]
  className?: string
}) => (
  <div className={cn('space-y-4', className)}>
    {items.map((paragraph, index) => (
      // eslint-disable-next-line react/no-array-index-key -- static, never reordered
      <p key={index}>{paragraph}</p>
    ))}
  </div>
)
