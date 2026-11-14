import { cn } from 'cn'

import { SectionHeading } from '@/components/shared/SectionHeading'

/** Every semantic colour token, paired with its foreground. */
const SWATCHES = [
  { name: 'background', className: 'bg-background text-foreground' },
  { name: 'surface', className: 'bg-surface text-surface-foreground' },
  { name: 'card', className: 'bg-card text-card-foreground' },
  { name: 'muted', className: 'bg-muted text-muted-foreground' },
  { name: 'primary', className: 'bg-primary text-primary-foreground' },
  {
    name: 'primary-light',
    className: 'bg-primary-light text-primary-foreground',
  },
  {
    name: 'primary-dark',
    className: 'bg-primary-dark text-primary-foreground',
  },
  {
    name: 'primary-muted',
    className: 'bg-primary-muted text-primary-muted-foreground',
  },
  { name: 'secondary', className: 'bg-secondary text-secondary-foreground' },
  {
    name: 'secondary-muted',
    className: 'bg-secondary-muted text-secondary-muted-foreground',
  },
  { name: 'accent', className: 'bg-accent text-accent-foreground' },
  { name: 'highlight', className: 'bg-highlight text-highlight-foreground' },
  { name: 'success', className: 'bg-success text-success-foreground' },
  { name: 'warning', className: 'bg-warning text-warning-foreground' },
  { name: 'info', className: 'bg-info text-info-foreground' },
  {
    name: 'destructive',
    className: 'bg-destructive text-destructive-foreground',
  },
  { name: 'inverse', className: 'bg-inverse text-inverse-foreground' },
  { name: 'overlay', className: 'bg-overlay text-overlay-foreground' },
] as const

export const StyleguideTokens = () => (
  <section className="section" aria-labelledby="tokens-heading">
    <div className="container-page">
      <SectionHeading
        id="tokens-heading"
        eyebrow="Foundations"
        title="Colour tokens"
        description="Components may only use these semantic tokens. Toggle the theme to check both modes."
        align="start"
      />
      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {SWATCHES.map((swatch) => (
          <li key={swatch.name}>
            <div
              className={cn(
                'flex h-24 items-end rounded-xl border p-3 text-sm font-semibold',
                swatch.className
              )}
            >
              Aa
            </div>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {swatch.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
