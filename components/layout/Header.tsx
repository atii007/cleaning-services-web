import Link from 'next/link'
import { PhoneIcon } from 'lucide-react'

import { MainNav } from '@/components/layout/MainNav'
import { MobileNav } from '@/components/layout/MobileNav'
import { Logo } from '@/components/shared/Logo'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/content/site'

export const Header = () => {
  const primaryPhone = SITE_CONFIG.contact.phones[0]

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <MainNav />
        <div className="flex items-center gap-2">
          <ThemeSwitcher className="hidden lg:inline-flex" />
          {primaryPhone ? (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hidden sm:inline-flex"
            >
              <a href={`tel:${primaryPhone.tel}`}>
                <PhoneIcon />
                Call us
              </a>
            </Button>
          ) : null}
          <Button asChild size="lg" className="hidden sm:inline-flex">
            <Link href="/contact">Get a quote</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
