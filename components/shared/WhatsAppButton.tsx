import { FaWhatsapp } from 'react-icons/fa6'

import { SITE_CONFIG } from '@/content/site'
import { getWhatsAppUrl } from '@/lib/contact'

/** Floating WhatsApp chat button, fixed to the bottom-end corner. */
export const WhatsAppButton = () => (
  <a
    href={getWhatsAppUrl()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="group fixed end-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 inline-flex items-center gap-3 focus-visible:outline-none motion-safe:animate-in motion-safe:delay-1000 motion-safe:duration-500 motion-safe:fill-mode-backwards motion-safe:zoom-in-75 motion-safe:fade-in sm:end-6 sm:bottom-6"
  >
    <span
      aria-hidden
      className="hidden rounded-full bg-card px-4 py-2 text-sm font-semibold text-heading shadow-lg ring-1 ring-border transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none lg:inline-block lg:translate-x-2 lg:opacity-0 rtl:lg:-translate-x-2"
    >
      {SITE_CONFIG.ctas.whatsapp}
    </span>
    <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-success text-success-foreground shadow-lg ring-4 ring-success/20 transition-transform group-hover:scale-105 group-focus-visible:ring-ring motion-reduce:transition-none">
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-success opacity-40 motion-safe:animate-ping motion-safe:[animation-duration:2.5s]"
      />
      <FaWhatsapp className="relative size-7" aria-hidden />
    </span>
  </a>
)
