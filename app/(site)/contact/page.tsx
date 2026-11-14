import type { Metadata } from 'next'

import { CONTACT_PAGE } from '@/content/contact'
import { ContactPage } from '@/sections/contact/ContactPage'

export const metadata: Metadata = {
  title: CONTACT_PAGE.title,
  description: CONTACT_PAGE.metaDescription,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: CONTACT_PAGE.title,
    description: CONTACT_PAGE.metaDescription,
    url: '/contact',
    images: [{ url: CONTACT_PAGE.image.src, alt: CONTACT_PAGE.image.alt }],
  },
}

export default function ContactRoute() {
  return <ContactPage />
}
