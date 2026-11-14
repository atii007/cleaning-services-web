'use client'

import * as React from 'react'
import Link from 'next/link'
import { MenuIcon, PhoneIcon } from 'lucide-react'

import { Logo } from '@/components/shared/Logo'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
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

/** Slide-in navigation drawer for screens below lg. */
export const MobileNav = () => {
  const [open, setOpen] = React.useState(false)
  const closeMenu = () => setOpen(false)
  const primaryPhone = SITE_CONFIG.contact.phones[0]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs gap-0">
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
          <ul className="space-y-1">
            {SITE_CONFIG.mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-md px-3 py-2 font-medium text-heading hover:bg-muted"
                >
                  {item.label}
                </Link>
                {'children' in item ? (
                  <ul className="ms-3 space-y-1 border-s ps-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={closeMenu}
                          className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4 border-t p-4">
          {primaryPhone ? (
            <Button asChild size="lg" className="w-full">
              <a href={`tel:${primaryPhone.tel}`}>
                <PhoneIcon />
                Call {primaryPhone.display}
              </a>
            </Button>
          ) : null}
          <ThemeSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  )
}
