import { PhoneIcon } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

import { HeaderShell } from '@/components/layout/HeaderShell'
import { MainNav } from '@/components/layout/MainNav'
import { MobileNav } from '@/components/layout/MobileNav'
import { Logo } from '@/components/shared/Logo'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/content/site'
import { getTelHref, getWhatsAppUrl } from '@/lib/contact'

export const Header = () => {
  const { contact, ctas } = SITE_CONFIG
  const primaryPhone = contact.phones[0]

  return (
    <HeaderShell>
      <div className="container-page flex h-18 items-center justify-between gap-4 transition-[height] duration-300 group-data-scrolled/header:h-16 motion-reduce:transition-none">
        <Logo />
        <MainNav />
        <div className="flex items-center gap-2">
          <ThemeSwitcher className="hidden xl:inline-flex" />
          {primaryPhone ? (
            <a
              href={getTelHref(primaryPhone.tel)}
              className="hidden items-center gap-2.5 rounded-lg px-2 py-1 hover:bg-muted lg:inline-flex"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary-muted text-primary-muted-foreground">
                <PhoneIcon className="size-4" aria-hidden />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xs text-muted-foreground">
                  {ctas.call}
                </span>
                <span className="text-sm font-semibold text-heading">
                  {primaryPhone.display}
                </span>
              </span>
            </a>
          ) : null}
          <Button
            asChild
            size="lg"
            className="hidden h-10 bg-success px-4 text-success-foreground hover:bg-success/85 sm:inline-flex"
          >
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp aria-hidden />
              {ctas.whatsapp}
            </a>
          </Button>
          <MobileNav />
        </div>
      </div>
    </HeaderShell>
  )
}
