import { BeforeAfterSlider } from '@/components/shared/BeforeAfterSlider'
import { Reveal } from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { BEFORE_AFTER_ITEMS } from '@/content/gallery'
import { BEFORE_AFTER_SECTION } from '@/content/home'
import { GalleryGrid } from '@/sections/home/GalleryGrid'

const FEATURED = BEFORE_AFTER_ITEMS[0]

export const BeforeAfter = () => (
  <section
    className="bg-surface section"
    aria-labelledby="before-after-heading"
  >
    <div className="container-page">
      <SectionHeading
        id="before-after-heading"
        eyebrow={BEFORE_AFTER_SECTION.eyebrow}
        title={BEFORE_AFTER_SECTION.title}
        description={BEFORE_AFTER_SECTION.description}
      />
      <Reveal className="mx-auto mt-12 max-w-4xl">
        <BeforeAfterSlider
          before={FEATURED.before}
          after={FEATURED.after}
          title={FEATURED.title}
          sizes="(min-width: 56rem) 56rem, 100vw"
          className="shadow-2xl shadow-heading/10"
        />
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {FEATURED.title} · {FEATURED.location}
        </p>
      </Reveal>
      <div className="mt-16">
        <GalleryGrid />
      </div>
    </div>
  </section>
)
