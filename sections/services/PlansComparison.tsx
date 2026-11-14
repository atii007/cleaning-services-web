import { cn } from 'cn'
import { CheckIcon, MinusIcon } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

import { SectionHeading } from '@/components/shared/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SERVICE_PAGE_COPY } from '@/content/service-page'
import { getBookingMessage, getWhatsAppUrl } from '@/lib/contact'
import { formatPrice } from '@/lib/format'
import type { PlanFeature, ServicePlan } from '@/types/content'

type PlansComparisonProps = {
  serviceTitle: string
  plans: ServicePlan[]
  /** Optional; without rows the section shows plan cards only. */
  features?: PlanFeature[]
  className?: string
}

const COPY = SERVICE_PAGE_COPY.plans

/** Renders one plan's value for a feature row. Missing values count as "not included". */
const FeatureValue = ({ value }: { value: boolean | string | undefined }) => {
  if (typeof value === 'string') {
    return <span className="font-medium text-heading">{value}</span>
  }
  if (value) {
    return (
      <>
        <CheckIcon className="mx-auto size-5 text-success" aria-hidden />
        <span className="sr-only">{COPY.included}</span>
      </>
    )
  }
  return (
    <>
      <MinusIcon
        className="mx-auto size-5 text-muted-foreground/60"
        aria-hidden
      />
      <span className="sr-only">{COPY.notIncluded}</span>
    </>
  )
}

const PlanCta = ({
  serviceTitle,
  plan,
  className,
}: {
  serviceTitle: string
  plan: ServicePlan
  className?: string
}) => (
  <Button
    asChild
    size="lg"
    variant={plan.popular ? 'default' : 'outline'}
    className={cn(
      'h-11 w-full',
      plan.popular && 'bg-success text-success-foreground hover:bg-success/85',
      className
    )}
  >
    <a
      href={getWhatsAppUrl(
        getBookingMessage(serviceTitle, `the ${plan.name} plan`)
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp aria-hidden />
      {COPY.cta}
      <span className="sr-only"> {plan.name}</span>
    </a>
  </Button>
)

const Price = ({ plan }: { plan: ServicePlan }) => (
  <p className="mt-2">
    <span className="font-heading text-3xl font-extrabold text-heading">
      {formatPrice(plan.price)}
    </span>{' '}
    <span className="text-sm text-muted-foreground">{plan.unit}</span>
  </p>
)

/**
 * Plan comparison: a semantic table from `lg` up, stacked cards below.
 * Each layout is `hidden` at the other breakpoint, so assistive tech only
 * ever meets one. Works for any number of plans and feature rows.
 */
export const PlansComparison = ({
  serviceTitle,
  plans,
  features = [],
  className,
}: PlansComparisonProps) => (
  <section className={cn('section', className)} aria-labelledby="plans-heading">
    <div className="container-page">
      <SectionHeading
        id="plans-heading"
        eyebrow={COPY.eyebrow}
        title={COPY.title}
      />

      {/* Desktop: comparison table */}
      <div className="mt-12 hidden overflow-hidden rounded-3xl border bg-card shadow-sm lg:block">
        <table className="w-full table-fixed border-collapse text-sm">
          <caption className="sr-only">{COPY.caption(serviceTitle)}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-1/4 p-6 text-start align-bottom">
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {COPY.feature}
                </span>
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  scope="col"
                  className={cn(
                    'p-6 text-start align-top font-normal',
                    plan.popular && 'bg-primary-muted'
                  )}
                >
                  {plan.popular ? (
                    <Badge className="mb-2 bg-highlight text-highlight-foreground">
                      {COPY.popular}
                    </Badge>
                  ) : null}
                  <span className="block font-heading text-lg font-bold text-heading">
                    {plan.name}
                  </span>
                  <Price plan={plan} />
                  {plan.description ? (
                    <span className="mt-2 block text-muted-foreground">
                      {plan.description}
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          {features.length > 0 ? (
            <tbody>
              {features.map((feature) => (
                <tr key={feature.label} className="border-t">
                  <th
                    scope="row"
                    className="px-6 py-4 text-start font-medium text-foreground"
                  >
                    {feature.label}
                  </th>
                  {plans.map((plan, index) => (
                    <td
                      key={plan.name}
                      className={cn(
                        'px-6 py-4 text-center',
                        plan.popular && 'bg-primary-muted'
                      )}
                    >
                      <FeatureValue value={feature.values[index]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : null}
          <tfoot>
            <tr className="border-t">
              <td className="p-6" />
              {plans.map((plan) => (
                <td
                  key={plan.name}
                  className={cn('p-6', plan.popular && 'bg-primary-muted')}
                >
                  <PlanCta serviceTitle={serviceTitle} plan={plan} />
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile / tablet: one card per plan */}
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:hidden">
        {plans.map((plan, index) => (
          <li
            key={plan.name}
            className={cn(
              'flex flex-col rounded-3xl border bg-card p-6 shadow-sm',
              plan.popular && 'border-primary ring-2 ring-primary/20'
            )}
          >
            {plan.popular ? (
              <Badge className="mb-3 w-fit bg-highlight text-highlight-foreground">
                {COPY.popular}
              </Badge>
            ) : null}
            <h3 className="text-lg font-bold">{plan.name}</h3>
            <Price plan={plan} />
            {plan.description ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>
            ) : null}
            {features.length > 0 ? (
              <dl className="mt-5 flex-1 divide-y border-t text-sm">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center justify-between gap-4 py-2.5"
                  >
                    <dt className="text-muted-foreground">{feature.label}</dt>
                    <dd className="shrink-0 text-end">
                      <FeatureValue value={feature.values[index]} />
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <PlanCta serviceTitle={serviceTitle} plan={plan} className="mt-6" />
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {COPY.note}
      </p>
    </div>
  </section>
)
