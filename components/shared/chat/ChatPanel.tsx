'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from 'cn'
import {
  ArrowRightIcon,
  MessageCircleQuestionIcon,
  PhoneIcon,
  RotateCcwIcon,
  XIcon,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { CHAT_COPY, type ChatTopic } from '@/content/chat'
import { getTelHref, getWhatsAppUrl } from '@/lib/contact'
import type { Faq } from '@/types/content'

export type ChatData = {
  topics: ChatTopic[]
  services: {
    title: string
    summary: string
    href: string
    price?: string
  }[]
  areas: string[]
  faqs: Faq[]
  phone?: { display: string; tel: string }
}

type Step = { key: number; topic: ChatTopic; faq?: Faq }

/** Area names shown before "and N more". */
const AREA_PREVIEW = 12

const BUBBLE = 'max-w-[90%] rounded-2xl px-4 py-3 text-sm'

const BotBubble = ({ children }: { children: React.ReactNode }) => (
  <div
    className={cn(BUBBLE, 'self-start rounded-ss-sm bg-muted text-foreground')}
  >
    {children}
  </div>
)

const UserBubble = ({ children }: { children: React.ReactNode }) => (
  <p
    className={cn(
      BUBBLE,
      'self-end rounded-se-sm bg-primary text-primary-foreground'
    )}
  >
    {children}
  </p>
)

const WhatsAppLink = ({
  message,
  children,
  className,
}: {
  message?: string
  children: React.ReactNode
  className?: string
}) => (
  <a
    href={getWhatsAppUrl(message)}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-lg bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground transition-colors hover:bg-success/85 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
      className
    )}
  >
    <FaWhatsapp className="size-4" aria-hidden />
    {children}
  </a>
)

/** The assistant's answer for one step, built from content. */
const Answer = ({
  step,
  data,
  onNavigate,
}: {
  step: Step
  data: ChatData
  onNavigate: () => void
}) => {
  const { topic, faq } = step

  if (faq) {
    return <p>{faq.answer}</p>
  }

  switch (topic.kind) {
    case 'services':
    case 'prices':
      return (
        <>
          <p>{topic.intro}</p>
          <ul className="mt-3 space-y-2">
            {data.services.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  onClick={onNavigate}
                  className="group flex items-center justify-between gap-3 rounded-xl bg-background p-3 transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold text-heading group-hover:text-primary">
                      {service.title}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {topic.kind === 'prices' && service.price
                        ? `${CHAT_COPY.from} ${service.price}`
                        : service.summary}
                    </span>
                  </span>
                  <ArrowRightIcon
                    className="size-4 shrink-0 rtl:rotate-180"
                    aria-hidden
                  />
                  <span className="sr-only">
                    {CHAT_COPY.viewService} {service.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )
    case 'areas': {
      const extra = data.areas.length - AREA_PREVIEW
      return (
        <>
          <p>{topic.intro}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {data.areas.slice(0, AREA_PREVIEW).map((area) => (
              <li
                key={area}
                className="rounded-full bg-background px-2.5 py-1 text-xs"
              >
                {area}
              </li>
            ))}
            {extra > 0 ? (
              <li className="px-1 py-1 text-xs text-muted-foreground">
                {CHAT_COPY.moreAreas(extra)}
              </li>
            ) : null}
          </ul>
        </>
      )
    }
    case 'faqs':
      return <p>{topic.intro}</p>
    case 'contact':
      return (
        <>
          <p>{topic.intro}</p>
          {data.phone ? (
            <a
              href={getTelHref(data.phone.tel)}
              className="mt-3 inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-dark"
            >
              <PhoneIcon className="size-4" aria-hidden />
              {CHAT_COPY.callLabel} {data.phone.display}
            </a>
          ) : null}
        </>
      )
  }
}

/**
 * Floating quick-reply assistant, stacked above the WhatsApp button. The
 * panel is a non-modal dialog: Esc or the close button returns focus to
 * the launcher, and new answers are announced through a live log.
 */
export const ChatPanel = ({ data }: { data: ChatData }) => {
  const panelId = React.useId()
  const titleId = `${panelId}-title`
  const [open, setOpen] = React.useState(false)
  const [steps, setSteps] = React.useState<Step[]>([])
  const launcherRef = React.useRef<HTMLButtonElement>(null)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const logRef = React.useRef<HTMLDivElement>(null)
  const repliesRef = React.useRef<HTMLUListElement>(null)
  /** Set when a quick reply is chosen, so focus can follow the new options. */
  const focusRepliesRef = React.useRef(false)

  const lastStep = steps.at(-1)

  const close = () => {
    setOpen(false)
    launcherRef.current?.focus()
  }

  const addStep = (topic: ChatTopic, faq?: Faq) => {
    focusRepliesRef.current = true
    setSteps((current) => [
      ...current,
      { key: (current.at(-1)?.key ?? 0) + 1, topic, faq },
    ])
  }

  const restart = () => {
    focusRepliesRef.current = true
    setSteps([])
  }

  React.useEffect(() => {
    if (open) {
      titleRef.current?.focus()
    }
  }, [open])

  // Keep the newest message in view, and move focus to the new quick
  // replies (the chosen button may no longer exist).
  React.useEffect(() => {
    const log = logRef.current
    if (log) {
      log.scrollTop = log.scrollHeight
    }
    if (focusRepliesRef.current) {
      focusRepliesRef.current = false
      repliesRef.current?.querySelector('button')?.focus()
    }
  }, [steps, open])

  const faqTopicActive = lastStep?.topic.kind === 'faqs' && !lastStep.faq

  return (
    <>
      <div
        id={panelId}
        role="dialog"
        aria-labelledby={titleId}
        hidden={!open}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation()
            close()
          }
        }}
        className="fixed end-4 bottom-[calc(8.5rem+env(safe-area-inset-bottom))] z-50 flex max-h-[min(36rem,calc(100dvh-10rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-heading/15 motion-safe:animate-in motion-safe:duration-200 motion-safe:fade-in motion-safe:slide-in-from-bottom-2 sm:end-6 sm:bottom-[9rem]"
      >
        <div className="flex items-start gap-3 bg-inverse p-4 text-inverse-muted-foreground">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MessageCircleQuestionIcon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id={titleId}
              ref={titleRef}
              tabIndex={-1}
              className="text-base font-bold text-inverse-foreground focus:outline-none"
            >
              {CHAT_COPY.title}
            </h2>
            <p className="text-xs">{CHAT_COPY.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={CHAT_COPY.closeLabel}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-overlay-foreground/10 hover:text-inverse-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <XIcon className="size-4" aria-hidden />
          </button>
        </div>

        <div className="border-b p-3">
          <WhatsAppLink className="w-full">
            {CHAT_COPY.whatsappCta}
          </WhatsAppLink>
        </div>

        <div
          ref={logRef}
          role="log"
          aria-label={CHAT_COPY.logLabel}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-4"
        >
          <BotBubble>{CHAT_COPY.greeting}</BotBubble>
          {steps.map((step) => (
            <React.Fragment key={step.key}>
              <UserBubble>{step.faq?.question ?? step.topic.label}</UserBubble>
              <BotBubble>
                <Answer
                  step={step}
                  data={data}
                  onNavigate={() => setOpen(false)}
                />
                {step === lastStep && !faqTopicActive ? (
                  <WhatsAppLink
                    message={
                      step.faq
                        ? `${step.topic.whatsappMessage} ${step.faq.question}`
                        : step.topic.whatsappMessage
                    }
                    className="mt-3"
                  >
                    {CHAT_COPY.handoff}
                  </WhatsAppLink>
                ) : null}
              </BotBubble>
            </React.Fragment>
          ))}
        </div>

        <div className="border-t bg-surface p-3">
          {lastStep && !faqTopicActive ? (
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              {CHAT_COPY.morePrompt}
            </p>
          ) : null}
          <ul
            ref={repliesRef}
            className="flex max-h-36 flex-wrap gap-2 overflow-y-auto"
          >
            {faqTopicActive && lastStep
              ? data.faqs.map((faq) => (
                  <li key={faq.question}>
                    <QuickReply onClick={() => addStep(lastStep.topic, faq)}>
                      {faq.question}
                    </QuickReply>
                  </li>
                ))
              : data.topics
                  .filter(
                    (topic) =>
                      topic.id !== lastStep?.topic.id || Boolean(lastStep.faq)
                  )
                  .map((topic) => (
                    <li key={topic.id}>
                      <QuickReply onClick={() => addStep(topic)}>
                        {topic.label}
                      </QuickReply>
                    </li>
                  ))}
            {steps.length > 0 ? (
              <li>
                <QuickReply onClick={restart} subtle>
                  <RotateCcwIcon className="size-3.5" aria-hidden />
                  {CHAT_COPY.restart}
                </QuickReply>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <Button
        ref={launcherRef}
        type="button"
        size="icon"
        variant="outline"
        aria-label={open ? CHAT_COPY.closeLabel : CHAT_COPY.launcherLabel}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : setOpen(true))}
        className="fixed end-[1.375rem] bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-40 size-11 rounded-full bg-card text-primary shadow-lg hover:bg-card hover:text-primary-dark motion-safe:animate-in motion-safe:delay-1000 motion-safe:duration-500 motion-safe:fill-mode-backwards motion-safe:zoom-in-75 motion-safe:fade-in sm:end-[1.875rem] sm:bottom-24"
      >
        {open ? (
          <XIcon className="size-5" aria-hidden />
        ) : (
          <MessageCircleQuestionIcon className="size-5" aria-hidden />
        )}
      </Button>
    </>
  )
}

const QuickReply = ({
  onClick,
  subtle = false,
  children,
}: {
  onClick: () => void
  subtle?: boolean
  children: React.ReactNode
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-start text-xs font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
      subtle
        ? 'text-muted-foreground hover:text-heading'
        : 'border-primary/30 bg-background text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground'
    )}
  >
    {children}
  </button>
)
