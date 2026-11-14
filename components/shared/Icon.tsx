import type { LucideProps } from 'lucide-react'

import { type IconName, ICONS } from '@/lib/icons'

/** Decorative icon looked up by content key (see `lib/icons.ts`). */
export const Icon = ({ name, ...props }: { name: IconName } & LucideProps) => {
  const Component = ICONS[name]
  return <Component aria-hidden {...props} />
}
