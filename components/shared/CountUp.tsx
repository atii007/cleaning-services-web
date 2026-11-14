'use client'

import * as React from 'react'
import { animate, useInView } from 'motion/react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type CountUpProps = {
  value: number
  decimals?: number
  /** Seconds. */
  duration?: number
  className?: string
}

const format = (value: number, decimals: number) =>
  value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

/**
 * Counts from 0 to `value` once when scrolled into view. The server and
 * reduced-motion render show the final value, so the number is never wrong
 * without JavaScript.
 */
export const CountUp = ({
  value,
  decimals = 0,
  duration = 1.6,
  className,
}: CountUpProps) => {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reducedMotion = usePrefersReducedMotion()

  React.useEffect(() => {
    const node = ref.current
    if (!inView || reducedMotion || !node) {
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest, decimals)
      },
    })
    return () => controls.stop()
  }, [inView, reducedMotion, value, decimals, duration])

  return (
    <span ref={ref} className={className}>
      {format(value, decimals)}
    </span>
  )
}
