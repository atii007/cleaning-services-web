import type { Metadata } from 'next'

import { CtaBand } from '@/components/shared/CtaBand'
import { PageHero } from '@/components/shared/PageHero'
import { PLACEHOLDER_IMAGES } from '@/content/images'
import { StyleguideComponents } from '@/sections/styleguide/StyleguideComponents'
import { StyleguideTokens } from '@/sections/styleguide/StyleguideTokens'
import { StyleguideTypography } from '@/sections/styleguide/StyleguideTypography'

export const metadata: Metadata = {
  title: 'Style guide',
  description: 'Internal design-system reference.',
  robots: { index: false, follow: false },
}

export default function StyleguidePage() {
  return (
    <>
      <PageHero
        eyebrow="Design system"
        title="Style guide"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. A living reference for tokens, typography and shared building blocks."
        image={PLACEHOLDER_IMAGES.bedroom}
        breadcrumbs={[{ label: 'Style guide', href: '/styleguide' }]}
      />
      <StyleguideTokens />
      <StyleguideTypography />
      <StyleguideComponents />
      <CtaBand />
    </>
  )
}
