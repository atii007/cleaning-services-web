import { ClockIcon, MailIcon, PhoneIcon } from 'lucide-react'

import { getSocialLabel, SocialIcon } from '@/components/shared/SocialIcon'
import { SITE_CONFIG } from '@/content/site'

/** Thin utility bar above the header: phone, email, hours and socials. */
export const TopBar = () => {
  const { contact, socials } = SITE_CONFIG
  const primaryPhone = contact.phones[0]

  return (
    <div className="hidden border-b border-inverse-muted-foreground/15 bg-inverse text-inverse-foreground md:block">
      <div className="container-page flex h-10 items-center justify-between gap-4 text-sm">
        <ul className="flex items-center gap-6">
          {primaryPhone ? (
            <li>
              <a
                href={`tel:${primaryPhone.tel}`}
                className="inline-flex items-center gap-2 hover:text-primary-light"
              >
                <PhoneIcon className="size-3.5" aria-hidden />
                {primaryPhone.display}
              </a>
            </li>
          ) : null}
          <li>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 hover:text-primary-light"
            >
              <MailIcon className="size-3.5" aria-hidden />
              {contact.email}
            </a>
          </li>
          <li className="hidden items-center gap-2 lg:inline-flex">
            <ClockIcon className="size-3.5" aria-hidden />
            {contact.hours}
          </li>
        </ul>
        <ul className="flex items-center gap-3">
          {socials.map((social) => (
            <li key={social.platform}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={getSocialLabel(social.platform)}
                className="inline-flex size-7 items-center justify-center rounded-full hover:bg-primary hover:text-primary-foreground"
              >
                <SocialIcon platform={social.platform} className="size-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
