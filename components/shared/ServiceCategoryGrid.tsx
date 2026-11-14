import Image from 'next/image'
import Link from 'next/link'
import { cn } from 'cn'
import { ArrowRightIcon } from 'lucide-react'

import { Icon } from '@/components/shared/Icon'
import { Reveal } from '@/components/shared/Reveal'
import { getServiceHref, SERVICE_CATEGORIES } from '@/content/services'
import type { ServiceCategory } from '@/types/content'

type ServiceCategoryGridProps = {
  /** Defaults to every category. */
  services?: readonly ServiceCategory[]
  className?: string
}

/** Card per service category — renders however many categories exist. */
export const ServiceCategoryGrid = ({
  services = SERVICE_CATEGORIES,
  className,
}: ServiceCategoryGridProps) => (
  <ul className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
    {services.map((service, index) => (
      <li key={service.slug}>
        <Reveal delay={index * 0.1} className="h-full">
          <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-xl hover:shadow-heading/5">
            <div className="relative">
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="absolute start-6 -bottom-6 inline-flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg ring-4 ring-card">
                <Icon name={service.icon} className="size-6" />
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6 pt-10">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-muted-foreground">{service.summary}</p>
              <Link
                href={getServiceHref(service.slug)}
                className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary after:absolute after:inset-0 hover:text-primary-dark"
              >
                Learn more
                <span className="sr-only"> about {service.title}</span>
                <ArrowRightIcon
                  className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </article>
        </Reveal>
      </li>
    ))}
  </ul>
)
