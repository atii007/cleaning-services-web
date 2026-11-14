import { SectionHeading } from '@/components/shared/SectionHeading'

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum.'

export const StyleguideTypography = () => (
  <section className="bg-surface section" aria-labelledby="type-heading">
    <div className="container-page grid gap-12 lg:grid-cols-2">
      <SectionHeading
        id="type-heading"
        eyebrow="Foundations"
        title="Typography"
        description="Plus Jakarta Sans for headings, Inter for body copy. Headings balance automatically."
        align="start"
      />
      <div className="space-y-6">
        <p className="eyebrow">Eyebrow label</p>
        <p className="font-heading text-5xl font-extrabold text-heading">
          Display 5xl
        </p>
        <h3 className="text-3xl font-bold">Heading 3xl</h3>
        <h3 className="text-2xl font-bold">Heading 2xl</h3>
        <h3 className="text-xl font-semibold">Heading xl</h3>
        <p className="text-lg">{LOREM}</p>
        <p>{LOREM}</p>
        <p className="text-sm text-muted-foreground">{LOREM}</p>
      </div>
    </div>
  </section>
)
