'use client'

import { motion, MotionConfig } from 'motion/react'
import type * as React from 'react'

type RevealProps = {
  children: React.ReactNode
  /** Seconds to wait before animating — use to stagger siblings. */
  delay?: number
  className?: string
}

/**
 * Fades and slides content in as it scrolls into view, once.
 * `reducedMotion="user"` drops the slide for visitors who prefer reduced
 * motion, leaving only a short fade.
 */
export const Reveal = ({ children, delay = 0, className }: RevealProps) => (
  <MotionConfig reducedMotion="user">
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  </MotionConfig>
)
