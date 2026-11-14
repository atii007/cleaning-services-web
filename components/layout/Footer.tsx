import Link from 'next/link'
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'

import { Logo } from '@/components/shared/Logo'
import { getSocialLabel, SocialIcon } from '@/components/shared/SocialIcon'
import { SITE_CONFIG } from '@/content/site'
import type { NavItem } from '@/types/site'

const FooterLinks = ({
  title,
  links,
}: {
  title: string
  links: readonly NavItem[]
}) => (
  <div>
    <h2 className="text-sm font-semibold tracking-wider text-inverse-foreground uppercase">
      {title}
    </h2>
    <ul className="mt-4 space-y-2.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-sm text-inverse-muted-foreground hover:text-primary-light"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export const Footer = () => {
  const { contact, footerNav, socials } = SITE_CONFIG
  const { address } = contact

  return (
    <footer className="bg-inverse text-inverse-muted-foreground">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <Logo inverse />
          <p className="max-w-sm text-sm leading-relaxed">
            {SITE_CONFIG.description}
          </p>
          <ul className="flex gap-2">
            {socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={getSocialLabel(social.platform)}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-inverse-muted-foreground/30 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <SocialIcon platform={social.platform} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterLinks title="Services" links={footerNav.services} />
        <FooterLinks title="Company" links={footerNav.company} />

        <div>
          <h2 className="text-sm font-semibold tracking-wider text-inverse-foreground uppercase">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5">
              <MapPinIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
              <address className="not-italic">
                {address.street}, {address.locality}
              </address>
            </li>
            {contact.phones.map((phone) => (
              <li key={phone.tel}>
                <a
                  href={`tel:${phone.tel}`}
                  className="flex gap-2.5 hover:text-primary-light"
                >
                  <PhoneIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {phone.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex gap-2.5 hover:text-primary-light"
              >
                <MailIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
                {contact.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <ClockIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
              {contact.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-inverse-muted-foreground/15">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>
            © <CopyrightYear /> {SITE_CONFIG.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

const CopyrightYear = async () => {
  'use cache'
  return new Date().getFullYear()
}
