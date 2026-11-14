'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import {
  CircleCheckIcon,
  MailIcon,
  PhoneIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { FaWhatsapp } from 'react-icons/fa6'
import { toast } from 'sonner'

import { type EnquiryEmailResult, sendEnquiryEmail } from '@/actions/enquiry'
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

type EmailState =
  | { status: 'idle' }
  | { status: 'sent' }
  | { status: 'error'; message: string; values: EnquiryValues }

const EMAIL = ENQUIRY_FORM.email

/**
 * Quote request form. Validates with the shared Zod schema, then hands the
 * enquiry to WhatsApp as a pre-filled message. With `allowEmail` (Contact
 * page only) the visitor can instead send it by email via a server action.
 */
export const EnquiryForm = ({
  defaultService,
  defaultArea = '',
  allowEmail = false,
}: {
  /** Preselects a service slug, e.g. on that service's own page. */
  defaultService?: string
  /** Prefills the area field, e.g. on an area page. */
  defaultArea?: string
  /** Adds the email field and a "Send by email" button. */
  allowEmail?: boolean
}) => {
  const id = React.useId()
  const pathname = usePathname()
  const { fields } = ENQUIRY_FORM
  const primaryPhone = SITE_CONFIG.contact.phones[0]
  const honeypotRef = React.useRef<HTMLInputElement>(null)
  const startedAtRef = React.useRef(0)
  const [emailState, setEmailState] = React.useState<EmailState>({
    status: 'idle',
  })

  // Set after mount: render time must not be read during prerendering.
  React.useEffect(() => {
    startedAtRef.current = Date.now()
  }, [])

  const form = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      service: defaultService,
      name: '',
      phone: '',
      email: '',
      area: defaultArea,
      preferredDate: '',
      message: '',
    },
  })
  const { errors } = form.formState

  const onSubmit = (values: EnquiryValues) => {
    openWhatsApp(getWhatsAppUrl(buildEnquiryMessage(values)))
    toast.success(ENQUIRY_FORM.success)
    setEmailState({ status: 'idle' })
    form.reset()
  }

  const onEmailSubmit = async (values: EnquiryValues) => {
    const result: EnquiryEmailResult = await sendEnquiryEmail(values, {
      website: honeypotRef.current?.value ?? '',
      startedAt: startedAtRef.current,
      page: pathname,
    })
    if (result.status === 'sent') {
      setEmailState({ status: 'sent' })
      form.reset()
      return
    }
    setEmailState({ status: 'error', message: result.message, values })
  }

  if (emailState.status === 'sent') {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-3xl border bg-card p-8 text-center shadow-xl shadow-heading/5 sm:p-10"
      >
        <CircleCheckIcon className="size-14 text-success" aria-hidden />
        <h3 className="mt-4 text-2xl font-bold">{EMAIL.successTitle}</h3>
        <p className="mt-2 text-muted-foreground">{EMAIL.successText}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            size="lg"
            className="h-12 bg-success px-6 text-base text-success-foreground hover:bg-success/85"
            onClick={() => openWhatsApp(getWhatsAppUrl())}
          >
            <FaWhatsapp aria-hidden />
            {EMAIL.alsoWhatsApp}
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="h-12 px-6 text-base"
            onClick={() => setEmailState({ status: 'idle' })}
          >
            {EMAIL.sendAnother}
          </Button>
        </div>
      </div>
    )
  }

  const fieldId = (name: keyof EnquiryValues) => `${id}-${name}`

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      aria-labelledby={`${id}-title`}
      className="relative rounded-3xl border bg-card p-6 shadow-xl shadow-heading/5 sm:p-8"
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

        {allowEmail ? (
          <Field data-invalid={Boolean(errors.email)} className="sm:col-span-2">
            <FieldLabel htmlFor={fieldId('email')}>
              {fields.email.label} <OptionalTag />
            </FieldLabel>
            <Input
              id={fieldId('email')}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={fields.email.placeholder}
              aria-invalid={Boolean(errors.email)}
              className={CONTROL_CLASS}
              {...form.register('email')}
            />
            <FieldError errors={[errors.email]} />
          </Field>
        ) : null}

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

      {allowEmail ? (
        // Honeypot: off-screen and out of the tab order, so only bots fill it.
        <div
          aria-hidden
          className="absolute -start-[9999px] size-px overflow-hidden"
        >
          <label htmlFor={`${id}-website`}>{EMAIL.honeypotLabel}</label>
          <input
            ref={honeypotRef}
            id={`${id}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>
      ) : null}

      {emailState.status === 'error' ? (
        <div
          role="alert"
          className="mt-6 flex flex-col gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="flex items-start gap-2 text-destructive">
            <TriangleAlertIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
            {emailState.message}
          </p>
          <Button
            type="button"
            size="sm"
            className="shrink-0 bg-success text-success-foreground hover:bg-success/85"
            onClick={() => onSubmit(emailState.values)}
          >
            <FaWhatsapp aria-hidden />
            {EMAIL.whatsAppInstead}
          </Button>
        </div>
      ) : null}

      <div
        role={allowEmail ? 'group' : undefined}
        aria-label={allowEmail ? EMAIL.choose : undefined}
        className={cn('mt-6 grid gap-3', allowEmail && 'sm:grid-cols-2')}
      >
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="h-12 w-full bg-success text-base text-success-foreground hover:bg-success/85"
        >
          <FaWhatsapp aria-hidden />
          {ENQUIRY_FORM.submit}
        </Button>
        {allowEmail ? (
          <Button
            type="button"
            size="lg"
            variant="outline"
            disabled={form.formState.isSubmitting}
            onClick={(event) => {
              void form.handleSubmit(onEmailSubmit)(event)
            }}
            className="h-12 w-full text-base"
          >
            <MailIcon aria-hidden />
            {form.formState.isSubmitting ? EMAIL.sending : EMAIL.submit}
          </Button>
        ) : null}
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        {allowEmail ? EMAIL.note : ENQUIRY_FORM.note}
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
