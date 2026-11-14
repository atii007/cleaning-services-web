'use client'

import * as React from 'react'

import type { CarouselApi } from '@/components/ui/carousel'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const subscribeVisibility = (onChange: () => void) => {
  document.addEventListener('visibilitychange', onChange)
  return () => document.removeEventListener('visibilitychange', onChange)
}

/**
 * Advances an embla carousel on a timer. Pauses while the carousel is
 * hovered or focused, while the tab is hidden, when the visitor presses
 * pause (WCAG 2.2.2), and never runs under reduced motion.
 *
 * Spread `pauseHandlers` on the carousel's wrapper element.
 */
export const useAutoplay = (
  api: CarouselApi | undefined,
  { delay = 6000 }: { delay?: number } = {}
) => {
  const reducedMotion = usePrefersReducedMotion()
  const [userPaused, setUserPaused] = React.useState(false)
  const [hovered, setHovered] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const pageHidden = React.useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => false
  )

  const enabled = !reducedMotion && !userPaused
  const running = enabled && !hovered && !focused && !pageHidden

  React.useEffect(() => {
    if (!api || !running) {
      return
    }
    const advance = () => api.scrollNext()
    let timer = window.setInterval(advance, delay)
    // Restart the countdown on every slide change, so a manual swipe or
    // dot click always gets a full `delay` before the next auto-advance.
    const restart = () => {
      window.clearInterval(timer)
      timer = window.setInterval(advance, delay)
    }
    api.on('select', restart)
    return () => {
      window.clearInterval(timer)
      api.off('select', restart)
    }
  }, [api, running, delay])

  const pauseHandlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setFocused(false)
      }
    },
  }

  return {
    /** Autoplay is allowed (not paused by the visitor or reduced motion). */
    isPlaying: enabled,
    /** Reduced motion disables autoplay entirely — hide the toggle. */
    canAutoplay: !reducedMotion,
    toggle: () => setUserPaused((paused) => !paused),
    pauseHandlers,
  }
}

/** Selected slide index and slide count for dots and "n of N" labels. */
export const useCarouselIndex = (
  api: CarouselApi | undefined,
  fallbackCount: number
) => {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (!api) {
        return () => {}
      }
      api.on('select', onChange).on('reInit', onChange)
      return () => {
        api.off('select', onChange).off('reInit', onChange)
      }
    },
    [api]
  )

  const selected = React.useSyncExternalStore(
    subscribe,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0
  )
  const count = React.useSyncExternalStore(
    subscribe,
    () => api?.scrollSnapList().length ?? fallbackCount,
    () => fallbackCount
  )

  return { selected, count }
}
