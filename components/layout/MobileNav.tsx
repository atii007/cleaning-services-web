'use client'

import * as React from 'react'
import { ClockIcon, MenuIcon } from 'lucide-react'

import { NavLink } from '@/components/layout/NavLink'
import { ContactActions } from '@/components/shared/ContactActions'
import { Icon } from '@/components/shared/Icon'
import { Logo } from '@/components/shared/Logo'
import { getSocialLabel, SocialIcon } from '@/components/shared/SocialIcon'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SITE_CONFIG } from '@/content/site'

const LINK_CLASS =
  'flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-heading hover:bg-muted data-active:bg-primary-muted data-active:text-primary-muted-foreground'

/** Slide-in navigation drawer for screens below lg. */
export const MobileNav = () => {
  const [open, setOpen] = React.useState(false)
  const closeMenu = () => setOpen(false)
  const { mainNav, contact, socials } = SITE_CONFIG

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <MenuIcon className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="gap-0 data-[side=right]:w-full data-[side=right]:max-w-sm"
      >
        <SheetHeader className="border-b">
          <SheetTitle asChild>
            <div>
              <Logo />
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) =>
              'children' in item ? (
                <li key={item.href}>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={item.href}>
                      <AccordionTrigger className="items-center px-3 py-2.5 text-base text-heading hover:bg-muted hover:no-underline">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="[&_a]:no-underline">
                        <ul className="ms-3 flex flex-col gap-1 border-s ps-3 pt-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <NavLink
                                href={child.href}
                                onClick={closeMenu}
                                className={LINK_CLASS}
                              >
                                <Icon
                                  name={child.icon}
                                  className="size-4 text-primary"
                                />
                                {child.label}
                              </NavLink>
                            </li>
                          ))}
                          <li>
                            <NavLink
                              href={item.href}
                              exact
                              onClick={closeMenu}
                              className={LINK_CLASS}
                            >
                              All {item.label.toLowerCase()}
                            </NavLink>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
              ) : (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    onClick={closeMenu}
                    className={LINK_CLASS}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 border-t p-4">
          <ContactActions stacked onAction={closeMenu} />
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ClockIcon className="size-4 text-primary" aria-hidden />
            {contact.hours} · {contact.availability}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ul className="flex gap-2">
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={getSocialLabel(social.platform)}
                    className="inline-flex size-9 items-center justify-center rounded-full border hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <SocialIcon platform={social.platform} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
            <ThemeSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
