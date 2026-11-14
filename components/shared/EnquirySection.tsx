import { cn } from 'cn'
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

import { EnquiryForm } from '@/components/shared/EnquiryForm'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { getSocialLabel, SocialIcon } from '@/components/shared/SocialIcon'
import { CONTACT_PANEL, CONTACT_SECTION } from '@/content/contact'
import { SITE_CONFIG } from '@/content/site'
import { getTelHref, getWhatsAppUrl } from '@/lib/contact'

const ROW_CLASS =
  'flex items-start gap-3 rounded-xl p-2 -mx-2 transition-colors hover:bg-overlay-foreground/5'

type EnquirySectionProps = {
  /** Preselects a service slug in the form. */
  defaultService?: string
  /** Prefills the area field in the form. */
  defaultArea?: string
  /** Overrides the default section heading. */
  title?: string
  className?: string
}

/**
 * Contact panel + WhatsApp enquiry form. Renders with `id="contact"`, the
 * target of every "Get a free quote" link on the page.
 */
export const EnquirySection = ({
  defaultService,
  defaultArea,
  title = CONTACT_SECTION.title,
  className,
}: EnquirySectionProps) => {
  const { contact, socials } = SITE_CONFIG

  return (
    <section
      id="contact"
      className={cn('scroll-mt-20 section', className)}
      aria-labelledby="contact-heading"
    >
      <div className="container-page">
        <SectionHeading
          id="contact-heading"
          eyebrow={CONTACT_SECTION.eyebrow}
          title={title}
          description={CONTACT_SECTION.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5 lg:gap-8">
          <aside
            aria-label={CONTACT_PANEL.title}
            className="relative isolate flex flex-col overflow-hidden rounded-3xl bg-inverse p-6 text-inverse-muted-foreground sm:p-8 lg:col-span-2"
          >
            <div
              aria-hidden
              className="absolute -end-20 -top-20 -z-10 size-72 rounded-full bg-primary/25 blur-3xl"
            />
            <h3 className="text-xl font-bold text-inverse-foreground">
              {CONTACT_PANEL.title}
            </h3>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-4 rounded-2xl bg-success p-4 text-success-foreground shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:transition-none"
            >
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-success-foreground/15">
                <FaWhatsapp className="size-7" aria-hidden />
              </span>
              <span className="flex flex-col">
                <span className="font-heading text-lg font-bold">
                  {CONTACT_PANEL.whatsappTitle}
                </span>
                <span className="text-sm opacity-90">
                  {CONTACT_PANEL.whatsappDescription}
                </span>
              </span>
            </a>

            <ul className="mt-6 space-y-1 text-sm">
              {contact.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={getTelHref(phone.tel)} className={ROW_CLASS}>
                    <PhoneIcon
                      className="mt-0.5 size-4 shrink-0 text-primary-light"
                      aria-hidden
                    />
                    <span>
                      <span className="block font-semibold text-inverse-foreground">
                        {phone.display}
                      </span>
                      {phone.label}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${contact.email}`} className={ROW_CLASS}>
                  <MailIcon
                    className="mt-0.5 size-4 shrink-0 text-primary-light"
                    aria-hidden
                  />
                  <span className="font-semibold text-inverse-foreground">
                    {contact.email}
                  </span>
                </a>
              </li>
              <li className={ROW_CLASS}>
                <MapPinIcon
                  className="mt-0.5 size-4 shrink-0 text-primary-light"
                  aria-hidden
                />
                <address className="not-italic">
                  {contact.address.street}, {contact.address.locality}
                </address>
              </li>
              <li className={ROW_CLASS}>
                <ClockIcon
                  className="mt-0.5 size-4 shrink-0 text-primary-light"
                  aria-hidden
                />
                <span>
                  <span className="block font-semibold text-inverse-foreground">
                    {contact.hours}
                  </span>
                  {contact.availability}
                </span>
              </li>
            </ul>

            <ul className="mt-8 flex gap-2 border-t border-inverse-muted-foreground/15 pt-6 lg:mt-auto">
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={getSocialLabel(social.platform)}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-inverse-muted-foreground/30 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <SocialIcon platform={social.platform} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="lg:col-span-3">
            <EnquiryForm
              defaultService={defaultService}
              defaultArea={defaultArea}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
