import type { Metadata } from 'next'

import { ABOUT_HERO } from '@/content/about'
import { AboutPage } from '@/sections/about/AboutPage'

export const metadata: Metadata = {
  title: ABOUT_HERO.eyebrow,
  description: ABOUT_HERO.metaDescription,
  alternates: { canonical: '/about' },
  openGraph: {
    title: ABOUT_HERO.title,
    description: ABOUT_HERO.metaDescription,
    url: '/about',
    images: [{ url: ABOUT_HERO.image.src, alt: ABOUT_HERO.image.alt }],
  },
}

export default function AboutRoute() {
  return <AboutPage />
}
