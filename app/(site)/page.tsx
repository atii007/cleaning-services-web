import { BeforeAfter } from '@/sections/home/BeforeAfter'
import { ClientLogos } from '@/sections/home/ClientLogos'
import { ContactSection } from '@/sections/home/ContactSection'
import { HeroSlider } from '@/sections/home/HeroSlider'
import { LatestPosts } from '@/sections/home/LatestPosts'
import { ServicesOverview } from '@/sections/home/ServicesOverview'
import { Testimonials } from '@/sections/home/Testimonials'
import { WhyChooseUs } from '@/sections/home/WhyChooseUs'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ServicesOverview />
      <WhyChooseUs />
      <BeforeAfter />
      <Testimonials />
      <ClientLogos />
      <ContactSection />
      <LatestPosts />
    </>
  )
}
