'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { PhoneIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { FaWhatsapp } from 'react-icons/fa6'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ENQUIRY_FORM } from '@/content/contact'
import { SERVICE_CATEGORIES } from '@/content/services'
import { SITE_CONFIG } from '@/content/site'
import { buildEnquiryMessage, getTelHref, getWhatsAppUrl } from '@/lib/contact'
import {
  ENQUIRY_SERVICE_OTHER,
  enquirySchema,
  type EnquiryValues,
} from '@/schemas/enquiry'

const CONTROL_CLASS = 'h-11 w-full text-base md:text-sm'

const OptionalTag = () => (
  <span className="font-normal text-muted-foreground">
    ({ENQUIRY_FORM.optional})
  </span>
)

/** Opens WhatsApp in a new tab, or in this tab if pop-ups are blocked. */
const openWhatsApp = (url: string) => {
  const opened = window.open(url, '_blank')
  if (opened) {
    opened.opener = null
    return
  }
  window.location.href = url
}

/**
 * Quote request form. Validates with the shared Zod schema, then hands the
 * enquiry to WhatsApp as a pre-filled message — nothing is lost while the
 * email backend (Phase 6) doesn't exist.
 */
export const EnquiryForm = ({
  defaultService,
}: {
  /** Preselects a service slug, e.g. on that service's own page. */
  defaultService?: string
}) => {
  const id = React.useId()
  const { fields } = ENQUIRY_FORM
  const primaryPhone = SITE_CONFIG.contact.phones[0]

  const form = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      service: defaultService,
      name: '',
      phone: '',
      area: '',
      preferredDate: '',
      message: '',
    },
  })
  const { errors } = form.formState

  const onSubmit = (values: EnquiryValues) => {
    openWhatsApp(getWhatsAppUrl(buildEnquiryMessage(values)))
    toast.success(ENQUIRY_FORM.success)
    form.reset()
  }

  const fieldId = (name: keyof EnquiryValues) => `${id}-${name}`

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      aria-labelledby={`${id}-title`}
      className="rounded-3xl border bg-card p-6 shadow-xl shadow-heading/5 sm:p-8"
    >
      <h3 id={`${id}-title`} className="text-2xl font-bold">
        {ENQUIRY_FORM.title}
      </h3>

      <FieldGroup className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor={fieldId('name')}>{fields.name.label}</FieldLabel>
          <Input
            id={fieldId('name')}
            autoComplete="name"
            placeholder={fields.name.placeholder}
            aria-invalid={Boolean(errors.name)}
            className={CONTROL_CLASS}
            {...form.register('name')}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field data-invalid={Boolean(errors.phone)}>
          <FieldLabel htmlFor={fieldId('phone')}>
            {fields.phone.label}
          </FieldLabel>
          <Input
            id={fieldId('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={fields.phone.placeholder}
            aria-invalid={Boolean(errors.phone)}
            className={CONTROL_CLASS}
            {...form.register('phone')}
          />
          <FieldError errors={[errors.phone]} />
        </Field>

        <Field data-invalid={Boolean(errors.service)}>
          <FieldLabel htmlFor={fieldId('service')}>
            {fields.service.label}
          </FieldLabel>
          <Controller
            control={form.control}
            name="service"
            render={({ field }) => (
              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                <SelectTrigger
                  id={fieldId('service')}
                  aria-invalid={Boolean(errors.service)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  className={cn(CONTROL_CLASS, 'data-[size=default]:h-11')}
                >
                  <SelectValue placeholder={fields.service.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_CATEGORIES.map((service) => (
                    <SelectItem key={service.slug} value={service.slug}>
                      {service.title}
                    </SelectItem>
                  ))}
                  <SelectItem value={ENQUIRY_SERVICE_OTHER}>
                    {ENQUIRY_FORM.otherService}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.service]} />
        </Field>

        <Field data-invalid={Boolean(errors.area)}>
          <FieldLabel htmlFor={fieldId('area')}>
            {fields.area.label} <OptionalTag />
          </FieldLabel>
          <Input
            id={fieldId('area')}
            autoComplete="address-level2"
            placeholder={fields.area.placeholder}
            aria-invalid={Boolean(errors.area)}
            className={CONTROL_CLASS}
            {...form.register('area')}
          />
          <FieldError errors={[errors.area]} />
        </Field>

        <Field className="sm:col-span-2">
          <FieldLabel htmlFor={fieldId('preferredDate')}>
            {fields.preferredDate.label} <OptionalTag />
          </FieldLabel>
          <Input
            id={fieldId('preferredDate')}
            type="date"
            className={CONTROL_CLASS}
            {...form.register('preferredDate')}
          />
        </Field>

        <Field data-invalid={Boolean(errors.message)} className="sm:col-span-2">
          <FieldLabel htmlFor={fieldId('message')}>
            {fields.message.label} <OptionalTag />
          </FieldLabel>
          <Textarea
            id={fieldId('message')}
            rows={4}
            placeholder={fields.message.placeholder}
            aria-invalid={Boolean(errors.message)}
            className="min-h-28 text-base md:text-sm"
            {...form.register('message')}
          />
          <FieldError errors={[errors.message]} />
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting}
        className="mt-6 h-12 w-full bg-success text-base text-success-foreground hover:bg-success/85"
      >
        <FaWhatsapp aria-hidden />
        {ENQUIRY_FORM.submit}
      </Button>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        {ENQUIRY_FORM.note}
      </p>
      {primaryPhone ? (
        <p className="mt-2 text-center text-sm">
          {ENQUIRY_FORM.callPrompt}{' '}
          <a
            href={getTelHref(primaryPhone.tel)}
            className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-dark"
          >
            <PhoneIcon className="size-3.5" aria-hidden />
            {primaryPhone.display}
          </a>
        </p>
      ) : null}
    </form>
  )
}
