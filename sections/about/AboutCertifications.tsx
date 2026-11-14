import { cn } from 'cn'

import { CertificationList } from '@/components/shared/CertificationList'
import { SectionHeading } from '@/components/shared/SectionHeading'
import type { SectionCopy } from '@/types/content'

type AboutCertificationsProps = {
  heading: SectionCopy
  className?: string
}

export const AboutCertifications = ({
  heading,
  className,
}: AboutCertificationsProps) => (
  <section
    className={cn('section', className)}
    aria-labelledby="certifications-heading"
  >
    <div className="container-page">
      <SectionHeading
        id="certifications-heading"
        eyebrow={heading.eyebrow}
        title={heading.title}
        description={heading.description}
      />
      <CertificationList className="mt-12" />
    </div>
  </section>
)
