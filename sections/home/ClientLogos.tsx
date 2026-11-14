import { Icon } from '@/components/shared/Icon'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CLIENT_LOGOS } from '@/content/clients'
import { CLIENTS_SECTION } from '@/content/home'

const LogoList = ({ hidden = false }: { hidden?: boolean }) => (
  <ul
    aria-hidden={hidden || undefined}
    className={
      hidden
        ? 'flex shrink-0 gap-4 pe-4 motion-reduce:hidden'
        : 'flex shrink-0 gap-4 pe-4 motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pe-0'
    }
  >
    {CLIENT_LOGOS.map((client) => {
      return (
        <li
          key={client.name}
          className="inline-flex h-16 items-center gap-2.5 rounded-xl border bg-card px-5 text-muted-foreground grayscale transition hover:text-heading hover:grayscale-0"
        >
          <Icon name={client.icon} className="size-6 text-primary" />
          <span className="font-heading text-base font-bold whitespace-nowrap">
            {client.name}
          </span>
        </li>
      )
    })}
  </ul>
)

/**
 * Infinite logo marquee: the list is rendered twice and the track slides by
 * half its width. Reduced motion shows a single, wrapped, static list.
 */
export const ClientLogos = () => (
  <section className="bg-surface section-sm" aria-labelledby="clients-heading">
    <div className="container-page">
      <SectionHeading
        id="clients-heading"
        eyebrow={CLIENTS_SECTION.eyebrow}
        title={CLIENTS_SECTION.title}
      />
    </div>
    <div className="group mt-10 overflow-hidden mask-x-from-90% motion-reduce:mask-none">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:container-page motion-reduce:w-full motion-reduce:animate-none rtl:animate-marquee-rtl">
        <LogoList />
        <LogoList hidden />
      </div>
    </div>
  </section>
)
