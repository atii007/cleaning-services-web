import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  AwardIcon,
  BadgeCheckIcon,
  ClockIcon,
  LandmarkIcon,
  LeafIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  RecycleIcon,
  ShieldCheckIcon,
} from 'lucide-react'
import type * as React from 'react'

import { Logo } from '@/components/shared/Logo'
import { getSocialLabel, SocialIcon } from '@/components/shared/SocialIcon'
import { SITE_CONFIG } from '@/content/site'
import { getTelHref } from '@/lib/contact'
import type { CertificationIcon, NavItem } from '@/types/site'

const CERTIFICATION_ICONS: Record<CertificationIcon, LucideIcon> = {
  award: AwardIcon,
  badge: BadgeCheckIcon,
  leaf: LeafIcon,
  shield: ShieldCheckIcon,
  recycle: RecycleIcon,
  landmark: LandmarkIcon,
}

const FooterHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-sm font-semibold tracking-wider text-inverse-foreground uppercase">
    {children}
  </h2>
)

const FooterLinks = ({
  title,
  links,
}: {
  title: string
  links: readonly NavItem[]
}) => (
  <div className="lg:col-span-2">
    <FooterHeading>{title}</FooterHeading>
    <ul className="mt-5 space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-sm transition-colors hover:text-primary-light"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

const Certifications = () => (
  <div className="border-t border-inverse-muted-foreground/15">
    <div className="container-page py-10">
      <FooterHeading>Licensed &amp; certified</FooterHeading>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {SITE_CONFIG.certifications.map((certification) => {
          const Icon = CERTIFICATION_ICONS[certification.icon]
          return (
            <li
              key={certification.name}
              className="flex items-center gap-3 rounded-xl border border-inverse-muted-foreground/15 p-3 transition-colors hover:border-primary/60"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-light">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-sm font-semibold text-inverse-foreground">
                  {certification.name}
                </span>
                <span className="text-xs">{certification.issuer}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  </div>
)

export const Footer = () => {
  const { contact, footerNav, socials } = SITE_CONFIG
  const { address } = contact

  return (
    <footer className="bg-inverse text-inverse-muted-foreground">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-12 lg:py-16">
        <div className="col-span-2 space-y-5 lg:col-span-4">
          <Logo inverse />
          <p className="max-w-sm text-sm leading-relaxed">
            {SITE_CONFIG.description}
          </p>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-inverse-muted-foreground/20 px-3 py-1.5 text-xs font-medium text-inverse-foreground">
            <span className="relative flex size-2.5" aria-hidden>
              <span className="absolute inline-flex size-full rounded-full bg-success opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            {contact.availability}
          </p>
          <ul className="flex gap-2">
            {socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={getSocialLabel(social.platform)}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-inverse-muted-foreground/30 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <SocialIcon platform={social.platform} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterLinks title="Services" links={footerNav.services} />
        <FooterLinks title="Company" links={footerNav.company} />

        <div className="col-span-2 lg:col-span-4">
          <FooterHeading>Get in touch</FooterHeading>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li className="flex gap-3">
              <MapPinIcon
                className="mt-0.5 size-4 shrink-0 text-primary-light"
                aria-hidden
              />
              <address className="not-italic">
                {address.street}, {address.locality}
              </address>
            </li>
            {contact.phones.map((phone) => (
              <li key={phone.tel}>
                <a
                  href={getTelHref(phone.tel)}
                  className="flex gap-3 transition-colors hover:text-primary-light"
                >
                  <PhoneIcon
                    className="mt-0.5 size-4 shrink-0 text-primary-light"
                    aria-hidden
                  />
                  <span>
                    <span className="text-inverse-foreground">
                      {phone.display}
                    </span>{' '}
                    · {phone.label}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex gap-3 transition-colors hover:text-primary-light"
              >
                <MailIcon
                  className="mt-0.5 size-4 shrink-0 text-primary-light"
                  aria-hidden
                />
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <ClockIcon
                className="mt-0.5 size-4 shrink-0 text-primary-light"
                aria-hidden
              />
              {contact.hours}
            </li>
          </ul>
        </div>
      </div>

      <Certifications />

      <div className="border-t border-inverse-muted-foreground/15">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 pb-24 text-xs sm:flex-row sm:pe-24 sm:pb-6">
          <p>
            © <CopyrightYear /> {SITE_CONFIG.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {footerNav.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

const CopyrightYear = async () => {
  'use cache'
  return new Date().getFullYear()
}
