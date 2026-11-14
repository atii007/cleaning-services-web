import { SERVICE_AREAS } from '@/content/areas'
import { CHAT_TOPICS } from '@/content/chat'
import { CONTACT_FAQS } from '@/content/contact'
import {
  getServiceHref,
  getStartingPrice,
  SERVICE_CATEGORIES,
} from '@/content/services'
import { SITE_CONFIG } from '@/content/site'
import { formatPrice } from '@/lib/format'

import { type ChatData, ChatPanel } from './ChatPanel'

/**
 * Guided chat assistant. Builds a small, serialisable snapshot of the
 * content it needs on the server, so the client bundle stays light.
 * Hidden when there are no topics.
 */
export const ChatAssistant = () => {
  if (CHAT_TOPICS.length === 0) {
    return null
  }

  const data: ChatData = {
    topics: CHAT_TOPICS,
    services: SERVICE_CATEGORIES.map((service) => {
      const price = getStartingPrice(service)
      return {
        title: service.title,
        summary: service.tagline,
        href: getServiceHref(service.slug),
        price: price === undefined ? undefined : formatPrice(price),
      }
    }),
    areas: [...SERVICE_AREAS],
    faqs: CONTACT_FAQS,
    phone: SITE_CONFIG.contact.phones[0],
  }

  return <ChatPanel data={data} />
}
