import { ContactActions } from '@/components/shared/ContactActions'
import { CtaBand } from '@/components/shared/CtaBand'
import { EnquirySection } from '@/components/shared/EnquirySection'
import { PageHero } from '@/components/shared/PageHero'
import { CONTACT_FAQS, CONTACT_MAP, CONTACT_PAGE } from '@/content/contact'
import { isEmailConfigured } from '@/lib/mail'
import { ContactMap } from '@/sections/contact/ContactMap'
import { ServiceFaq } from '@/sections/services/ServiceFaq'

/** The /contact page: enquiry form, map and FAQs (map and FAQs optional). */
export const ContactPage = () => (
  <>
    <PageHero
      eyebrow={CONTACT_PAGE.eyebrow}
      title={CONTACT_PAGE.title}
      description={CONTACT_PAGE.description}
      image={CONTACT_PAGE.image}
      breadcrumbs={[{ label: CONTACT_PAGE.title, href: '/contact' }]}
      actions={<ContactActions actions={['whatsapp', 'call']} inverse />}
    />
    <EnquirySection allowEmail={isEmailConfigured()} />
    {CONTACT_MAP ? (
      <ContactMap map={CONTACT_MAP} className="bg-surface" />
    ) : null}
    {CONTACT_FAQS.length > 0 ? (
      <ServiceFaq
        faqs={CONTACT_FAQS}
        heading={CONTACT_PAGE.faqSection}
        className={CONTACT_MAP ? undefined : 'bg-surface'}
      />
    ) : null}
    <CtaBand quoteHref="#contact" />
  </>
)
