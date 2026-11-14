import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'

import { getSocialLabel, SocialIcon } from '@/components/shared/SocialIcon'
import { SITE_CONFIG } from '@/content/site'
import { getTelHref } from '@/lib/contact'

const LINK_CLASS =
  'inline-flex items-center gap-2 transition-colors hover:text-primary-light'

/** Thin utility bar above the header: phones, email, hours and socials. */
export const TopBar = () => {
  const { contact, socials } = SITE_CONFIG

  return (
    <div className="hidden border-b border-inverse-muted-foreground/15 bg-inverse text-inverse-foreground md:block">
      <div className="container-page flex h-10 items-center justify-between gap-4 text-sm">
        <ul className="flex items-center gap-6">
          {contact.phones.map((phone, index) => (
            <li key={phone.tel} className={index > 0 ? 'hidden lg:block' : ''}>
              <a href={getTelHref(phone.tel)} className={LINK_CLASS}>
                <PhoneIcon
                  className="size-3.5 text-primary-light"
                  aria-hidden
                />
                <span className="sr-only">{phone.label}: </span>
                {phone.display}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${contact.email}`} className={LINK_CLASS}>
              <MailIcon className="size-3.5 text-primary-light" aria-hidden />
              {contact.email}
            </a>
          </li>
          <li className="hidden items-center gap-2 xl:inline-flex">
            <MapPinIcon className="size-3.5 text-primary-light" aria-hidden />
            {contact.address.locality}
          </li>
        </ul>
        <div className="flex items-center gap-5">
          <p className="hidden items-center gap-2 lg:inline-flex">
            <ClockIcon className="size-3.5 text-primary-light" aria-hidden />
            {contact.hours}
          </p>
          <ul className="flex items-center gap-1">
            {socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={getSocialLabel(social.platform)}
                  className="inline-flex size-7 items-center justify-center rounded-full transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <SocialIcon platform={social.platform} className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
