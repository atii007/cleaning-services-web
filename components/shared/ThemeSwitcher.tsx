'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { cn } from 'cn'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'

const THEME_OPTIONS = [
  { value: 'light', label: 'Light theme', Icon: SunIcon },
  { value: 'dark', label: 'Dark theme', Icon: MoonIcon },
  { value: 'system', label: 'System theme', Icon: MonitorIcon },
] as const

const subscribe = () => () => {}

/** Light / Dark / System segmented control. */
export const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme()
  // false on the server and during hydration, true afterwards — avoids a
  // mismatch because the stored theme is only known in the browser.
  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border bg-background p-0.5',
        className
      )}
    >
      {THEME_OPTIONS.map(({ value, label, Icon }) => {
        const isActive = mounted && theme === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              'inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              isActive &&
                'bg-primary text-primary-foreground hover:text-primary-foreground'
            )}
          >
            <Icon className="size-3.5" aria-hidden />
          </button>
        )
      })}
    </div>
  )
}
