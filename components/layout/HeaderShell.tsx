'use client'

import { cn } from 'cn'
import type * as React from 'react'

import { useScrolled } from '@/hooks/useScrolled'

/**
 * Sticky `<header>` that gains a shadow and blur once the page scrolls.
 * Children can react through `group-data-scrolled/header:*` utilities.
 */
export const HeaderShell = ({ children }: { children: React.ReactNode }) => {
  const scrolled = useScrolled()

  return (
    <header
      data-scrolled={scrolled ? '' : undefined}
      className={cn(
        'group/header sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 motion-reduce:transition-none',
        scrolled
          ? 'border-border bg-background/85 shadow-md shadow-heading/5 backdrop-blur-md supports-backdrop-filter:bg-background/75'
          : 'border-transparent bg-background'
      )}
    >
      {children}
    </header>
  )
}
