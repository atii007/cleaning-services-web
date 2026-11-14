import Image from 'next/image'
import Link from 'next/link'
import { cn } from 'cn'
import { ArrowRightIcon } from 'lucide-react'

import { NavLink } from '@/components/layout/NavLink'
import { ServiceIcon } from '@/components/shared/ServiceIcon'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { SITE_CONFIG } from '@/content/site'
import type { NavFeature, NavItem } from '@/types/site'

const ACTIVE_LINK =
  'data-active:text-primary data-active:after:absolute data-active:after:inset-x-2.5 data-active:after:-bottom-px data-active:after:h-0.5 data-active:after:rounded-full data-active:after:bg-primary'

const MegaMenuFeature = ({ feature }: { feature: NavFeature }) => (
  <Link
    href={feature.cta.href}
    className="group/feature relative isolate flex min-h-56 flex-col justify-end overflow-hidden rounded-lg p-4 text-overlay-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
  >
    <Image
      src={feature.image.src}
      alt=""
      fill
      sizes="15rem"
      className="-z-20 object-cover transition-transform duration-500 group-hover/feature:scale-105 motion-reduce:transition-none"
    />
    <span
      aria-hidden
      className="absolute inset-0 -z-10 bg-linear-to-t from-overlay via-overlay/60 to-transparent"
    />
    <span className="font-heading text-base font-semibold">
      {feature.title}
    </span>
    <span className="mt-1 text-xs text-overlay-foreground/80">
      {feature.description}
    </span>
    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light">
      {feature.cta.label}
      <ArrowRightIcon
        className="size-4 transition-transform group-hover/feature:translate-x-0.5 rtl:rotate-180 rtl:group-hover/feature:-translate-x-0.5"
        aria-hidden
      />
    </span>
  </Link>
)

const MegaMenu = ({ item }: { item: NavItem }) => (
  <div className="grid w-[40rem] grid-cols-[1fr_15rem] gap-3 p-3">
    <ul className="flex flex-col gap-1">
      {item.children?.map((child) => (
        <li key={child.href}>
          <NavigationMenuLink
            asChild
            className="items-start gap-3 p-3 data-active:bg-primary-muted"
          >
            <NavLink href={child.href}>
              {child.icon ? (
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary-muted-foreground">
                  <ServiceIcon name={child.icon} className="size-5" />
                </span>
              ) : null}
              <span className="flex flex-col gap-0.5">
                <span className="font-semibold text-heading">
                  {child.label}
                </span>
                {child.description ? (
                  <span className="text-muted-foreground">
                    {child.description}
                  </span>
                ) : null}
              </span>
            </NavLink>
          </NavigationMenuLink>
        </li>
      ))}
      <li className="mt-auto border-t pt-2">
        <NavigationMenuLink
          asChild
          className="justify-between font-semibold text-primary"
        >
          <Link href={item.href}>
            All {item.label.toLowerCase()}
            <ArrowRightIcon className="rtl:rotate-180" aria-hidden />
          </Link>
        </NavigationMenuLink>
      </li>
    </ul>
    {item.featured ? <MegaMenuFeature feature={item.featured} /> : null}
  </div>
)

/** Desktop navigation (lg and up). */
export const MainNav = () => (
  <NavigationMenu className="hidden lg:flex" aria-label="Main">
    <NavigationMenuList className="gap-1">
      {SITE_CONFIG.mainNav.map((item) =>
        'children' in item ? (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuTrigger className="h-10 px-3">
              {item.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <MegaMenu item={item} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                'relative h-10 px-3 data-active:bg-transparent',
                ACTIVE_LINK
              )}
            >
              <NavLink href={item.href}>{item.label}</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )
      )}
    </NavigationMenuList>
  </NavigationMenu>
)
