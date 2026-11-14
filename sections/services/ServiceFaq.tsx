import { cn } from 'cn'

import { ContactActions } from '@/components/shared/ContactActions'
import { SectionHeading } from '@/components/shared/SectionHeading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SERVICE_PAGE_COPY } from '@/content/service-page'
import type { Faq } from '@/types/content'

type ServiceFaqProps = {
  faqs: Faq[]
  className?: string
}

const COPY = SERVICE_PAGE_COPY.faqs

export const ServiceFaq = ({ faqs, className }: ServiceFaqProps) => (
  <section className={cn('section', className)} aria-labelledby="faq-heading">
    <div className="container-page grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading
          id="faq-heading"
          eyebrow={COPY.eyebrow}
          title={COPY.title}
          description={COPY.description}
          align="start"
        />
        <ContactActions actions={['whatsapp']} className="mt-6" />
      </div>
      <Accordion
        type="single"
        collapsible
        defaultValue={faqs[0]?.question}
        className="rounded-2xl border bg-card px-6"
      >
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger className="py-5 text-base font-semibold text-heading hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
)
