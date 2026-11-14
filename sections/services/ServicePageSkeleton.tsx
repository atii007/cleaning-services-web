import { Skeleton } from '@/components/ui/skeleton'

/** Fallback while a service page's params resolve on client navigation. */
export const ServicePageSkeleton = () => (
  <div aria-busy="true" aria-live="polite">
    <span className="sr-only">Loading service…</span>
    <div className="bg-inverse">
      <div className="container-page space-y-6 py-20 sm:py-28 lg:py-32">
        <Skeleton className="h-4 w-48 bg-overlay-foreground/15" />
        <Skeleton className="h-12 w-2/3 max-w-lg bg-overlay-foreground/15" />
        <Skeleton className="h-5 w-full max-w-xl bg-overlay-foreground/10" />
        <div className="flex gap-3">
          <Skeleton className="h-12 w-40 rounded-lg bg-overlay-foreground/15" />
          <Skeleton className="h-12 w-40 rounded-lg bg-overlay-foreground/10" />
        </div>
      </div>
    </div>
    <div className="section">
      <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {['a', 'b', 'c'].map((key) => (
          <Skeleton key={key} className="h-56 rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
)
