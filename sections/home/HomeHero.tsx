import Link from 'next/link'
import { CheckCircle2Icon, PhoneIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/content/site'

const HIGHLIGHTS = [
  'Trained & vetted staff',
  'Eco-friendly products',
  'Available 24/7',
] as const

/** Placeholder hero — the full slider hero arrives in Phase 2. */
export const HomeHero = () => {
  const primaryPhone = SITE_CONFIG.contact.phones[0]

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary-muted to-background section">
      <div className="container-page max-w-4xl text-center">
        <Badge className="bg-highlight text-highlight-foreground">
          Same-day booking available
        </Badge>
        <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
          {SITE_CONFIG.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {SITE_CONFIG.description}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <Link href="/contact">Get a free quote</Link>
          </Button>
          {primaryPhone ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-6 text-base"
            >
              <a href={`tel:${primaryPhone.tel}`}>
                <PhoneIcon />
                {primaryPhone.display}
              </a>
            </Button>
          ) : null}
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {HIGHLIGHTS.map((highlight) => (
            <li key={highlight} className="inline-flex items-center gap-2">
              <CheckCircle2Icon className="size-4 text-primary" aria-hidden />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
