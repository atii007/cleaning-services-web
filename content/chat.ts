/**
 * Guided chat assistant — PLACEHOLDER CONTENT.
 *
 * The assistant only offers quick replies; there is no free text and no AI.
 * Answers are built from existing content (services, prices, areas and the
 * contact FAQs), and every answer ends with a WhatsApp handoff. Reorder or
 * remove topics here; `kind` picks which content a topic shows.
 */

export type ChatTopicKind = 'services' | 'prices' | 'areas' | 'faqs' | 'contact'

export type ChatTopic = {
  id: string
  kind: ChatTopicKind
  /** Quick-reply button text (also shown as the visitor's message). */
  label: string
  /** First line of the assistant's answer. */
  intro: string
  /** Pre-filled WhatsApp message for this topic's handoff. */
  whatsappMessage: string
}

export const CHAT_COPY = {
  launcherLabel: 'Open chat assistant',
  closeLabel: 'Close chat assistant',
  title: 'Quick help',
  subtitle: 'Instant answers — or chat with our team on WhatsApp',
  greeting: 'Hi there 👋 What can I help you with?',
  whatsappCta: 'Chat on WhatsApp',
  handoff: 'Continue on WhatsApp',
  morePrompt: 'Anything else?',
  restart: 'Start over',
  from: 'From',
  viewService: 'View',
  moreAreas: (count: number) => `and ${count} more`,
  callLabel: 'Call',
  logLabel: 'Conversation',
} as const

export const CHAT_TOPICS: ChatTopic[] = [
  {
    id: 'services',
    kind: 'services',
    label: 'What services do you offer?',
    intro: 'Here is what our team can do for you:',
    whatsappMessage:
      'Hi, I would like to know more about your services. Can you help?',
  },
  {
    id: 'prices',
    kind: 'prices',
    label: 'How much does it cost?',
    intro:
      'Starting prices are below. Your final quote depends on the size and condition of the property.',
    whatsappMessage:
      'Hi, I would like a quote. Here are some details about my property:',
  },
  {
    id: 'areas',
    kind: 'areas',
    label: 'Which areas do you cover?',
    intro: 'We currently serve these areas:',
    whatsappMessage: 'Hi, do you cover my area? I am based in:',
  },
  {
    id: 'faqs',
    kind: 'faqs',
    label: 'I have a question',
    intro: 'These are the questions we hear most:',
    whatsappMessage: 'Hi, I have a question about your services:',
  },
  {
    id: 'contact',
    kind: 'contact',
    label: 'Talk to a person',
    intro:
      'Our team is available 24/7. WhatsApp is the fastest way to reach us, or give us a call.',
    whatsappMessage: 'Hi, I would like to talk to someone from your team.',
  },
]
