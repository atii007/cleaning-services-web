import { ArrowRightIcon, SparklesIcon } from 'lucide-react'
import type * as React from 'react'

import { ContactActions } from '@/components/shared/ContactActions'
import { Icon } from '@/components/shared/Icon'
import { Reveal } from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SERVICE_CATEGORIES } from '@/content/services'

const BUTTON_VARIANTS = [
  'default',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'link',
] as const

const Block = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="rounded-2xl border bg-card p-6">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="mt-5">{children}</div>
  </div>
)

export const StyleguideComponents = () => (
  <section className="section" aria-labelledby="components-heading">
    <div className="container-page">
      <SectionHeading
        id="components-heading"
        eyebrow="Building blocks"
        title="Components"
        description="shadcn primitives and shared blocks, as used across the site."
        align="start"
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Block title="Buttons">
          <div className="flex flex-wrap gap-3">
            {BUTTON_VARIANTS.map((variant) => (
              <Button key={variant} variant={variant} size="lg">
                {variant}
              </Button>
            ))}
            <Button size="lg">
              With icon
              <ArrowRightIcon className="rtl:rotate-180" aria-hidden />
            </Button>
          </div>
        </Block>

        <Block title="Badges">
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge className="bg-highlight text-highlight-foreground">
              <SparklesIcon aria-hidden />
              Highlight
            </Badge>
            <Badge className="bg-success text-success-foreground">
              Success
            </Badge>
          </div>
        </Block>

        <Block title="Contact actions">
          <ContactActions />
        </Block>

        <Block title="Section heading (centred)">
          <SectionHeading
            eyebrow="Eyebrow"
            title="Lorem ipsum dolor sit amet"
            description="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
          />
        </Block>
      </div>

      <h3 className="mt-16 text-2xl font-bold">Cards with scroll reveal</h3>
      <ul className="mt-6 grid gap-6 md:grid-cols-3">
        {SERVICE_CATEGORIES.map((service, index) => (
          <li key={service.slug}>
            <Reveal delay={index * 0.1} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary-muted text-primary-muted-foreground">
                    <Icon name={service.icon} className="size-6" />
                  </span>
                  <CardTitle className="mt-4 font-heading text-xl text-heading">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.tagline}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas faucibus mollis interdum.
                </CardContent>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
