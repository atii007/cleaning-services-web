import { Skeleton } from '@/components/ui/skeleton'

const LINE_WIDTHS = ['w-full', 'w-11/12', 'w-full', 'w-4/5', 'w-full', 'w-2/3']

/** Fallback for text pages (blog posts, policies) while params resolve. */
export const ArticleSkeleton = ({ label }: { label: string }) => (
  <div aria-busy="true" aria-live="polite">
    <span className="sr-only">{label}</span>
    <div className="bg-inverse">
      <div className="container-page space-y-6 py-20 sm:py-28 lg:py-32">
        <Skeleton className="h-4 w-48 bg-overlay-foreground/15" />
        <Skeleton className="h-12 w-2/3 max-w-lg bg-overlay-foreground/15" />
        <Skeleton className="h-5 w-full max-w-xl bg-overlay-foreground/10" />
      </div>
    </div>
    <div className="section">
      <div className="container-page max-w-3xl space-y-4">
        {LINE_WIDTHS.map((width, index) => (
          // eslint-disable-next-line react/no-array-index-key -- static placeholder lines
          <Skeleton key={index} className={`h-4 ${width}`} />
        ))}
      </div>
    </div>
  </div>
)
