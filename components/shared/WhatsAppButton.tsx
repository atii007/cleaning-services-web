import { FaWhatsapp } from 'react-icons/fa6'

import { getWhatsAppUrl } from '@/lib/seo'

/** Floating WhatsApp chat button, fixed to the bottom-end corner. */
export const WhatsAppButton = () => (
  <a
    href={getWhatsAppUrl()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed end-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 inline-flex size-14 items-center justify-center rounded-full bg-success text-success-foreground shadow-lg ring-4 ring-success/20 transition-transform hover:scale-105 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none sm:end-6 sm:bottom-6"
  >
    <FaWhatsapp className="size-7" aria-hidden />
  </a>
)
