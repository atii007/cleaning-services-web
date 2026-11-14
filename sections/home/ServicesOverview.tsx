import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRightIcon,
  HouseIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SERVICE_CATEGORIES } from '@/content/services'
import type { ServiceIcon } from '@/types/content'

const SERVICE_ICONS: Record<ServiceIcon, LucideIcon> = {
  sparkles: SparklesIcon,
  house: HouseIcon,
  shield: ShieldCheckIcon,
}

export const ServicesOverview = () => (
  <section className="bg-surface section" aria-labelledby="services-heading">
    <div className="container-page">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-wider text-primary uppercase">
          What we do
        </p>
        <h2
          id="services-heading"
          className="mt-2 text-3xl font-bold sm:text-4xl"
        >
          One trusted team for every space
        </h2>
      </div>
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {SERVICE_CATEGORIES.map((service) => {
          const Icon = SERVICE_ICONS[service.icon]
          return (
            <li key={service.slug}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary-muted text-primary-muted-foreground">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <CardTitle className="mt-4 font-heading text-xl text-heading">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.summary}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 hover:text-primary-dark"
                  >
                    Learn more
                    <span className="sr-only"> about {service.title}</span>
                    <ArrowRightIcon
                      className="size-4 rtl:rotate-180"
                      aria-hidden
                    />
                  </Link>
                </CardContent>
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  </section>
)
