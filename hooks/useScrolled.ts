'use client'

import * as React from 'react'

const subscribe = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

/** `true` once the page has scrolled past `threshold` pixels. */
export const useScrolled = (threshold = 8): boolean =>
  React.useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false
  )
