import { CtaBand } from '@/components/shared/CtaBand'
import { PageHero } from '@/components/shared/PageHero'
import {
  ABOUT_HERO,
  ABOUT_STORY,
  CERTIFICATIONS_SECTION,
  MILESTONES,
  MILESTONES_SECTION,
  MISSION_VISION,
  STATS_SECTION,
  TEAM,
  TEAM_SECTION,
  VALUES,
  VALUES_SECTION,
} from '@/content/about'
import { CLIENT_LOGOS } from '@/content/clients'
import { STATS } from '@/content/home'
import { SITE_CONFIG } from '@/content/site'
import { TESTIMONIALS } from '@/content/testimonials'
import { AboutCertifications } from '@/sections/about/AboutCertifications'
import { AboutStats } from '@/sections/about/AboutStats'
import { Milestones } from '@/sections/about/Milestones'
import { MissionVision } from '@/sections/about/MissionVision'
import { TeamGrid } from '@/sections/about/TeamGrid'
import { ClientLogos } from '@/sections/home/ClientLogos'
import { Testimonials } from '@/sections/home/Testimonials'
import {
  SectionStack,
  type StackSection,
} from '@/sections/services/SectionStack'
import { ServiceBenefits } from '@/sections/services/ServiceBenefits'
import { ServiceIntro } from '@/sections/services/ServiceIntro'

/** Adds a section only when its content list is non-empty. */
const when = (
  items: readonly unknown[],
  section: StackSection
): StackSection | null => (items.length > 0 ? section : null)

/** The About page. Every section is optional and driven by content. */
export const AboutPage = () => {
  const sections = [
    when(ABOUT_STORY.paragraphs, {
      key: 'story',
      render: (className) => (
        <ServiceIntro
          intro={ABOUT_STORY}
          eyebrow={ABOUT_STORY.eyebrow}
          className={className}
        />
      ),
    }),
    when(MISSION_VISION, {
      key: 'mission',
      render: (className) => (
        <MissionVision cards={MISSION_VISION} className={className} />
      ),
    }),
    when(STATS, {
      key: 'stats',
      render: (className) => (
        <AboutStats
          heading={STATS_SECTION}
          stats={STATS}
          className={className}
        />
      ),
    }),
    when(VALUES, {
      key: 'values',
      render: (className) => (
        <ServiceBenefits
          benefits={VALUES}
          heading={VALUES_SECTION}
          className={className}
        />
      ),
    }),
    when(MILESTONES, {
      key: 'milestones',
      render: (className) => (
        <Milestones
          heading={MILESTONES_SECTION}
          milestones={MILESTONES}
          className={className}
        />
      ),
    }),
    when(TEAM, {
      key: 'team',
      render: (className) => (
        <TeamGrid heading={TEAM_SECTION} members={TEAM} className={className} />
      ),
    }),
    when(SITE_CONFIG.certifications, {
      key: 'certifications',
      render: (className) => (
        <AboutCertifications
          heading={CERTIFICATIONS_SECTION}
          className={className}
        />
      ),
    }),
    when(TESTIMONIALS, {
      key: 'testimonials',
      render: (className) => <Testimonials className={className} />,
    }),
    when(CLIENT_LOGOS, {
      key: 'clients',
      render: (className) => <ClientLogos className={className} />,
    }),
  ]

  return (
    <>
      <PageHero
        eyebrow={ABOUT_HERO.eyebrow}
        title={ABOUT_HERO.title}
        description={ABOUT_HERO.description}
        image={ABOUT_HERO.image}
        breadcrumbs={[{ label: ABOUT_HERO.eyebrow, href: '/about' }]}
      />
      <SectionStack sections={sections} />
      <CtaBand />
    </>
  )
}
