import type { LucideIcon, LucideProps } from 'lucide-react'
import { HouseIcon, ShieldCheckIcon, SparklesIcon } from 'lucide-react'

import type { ServiceIconName } from '@/types/content'

const SERVICE_ICONS: Record<ServiceIconName, LucideIcon> = {
  sparkles: SparklesIcon,
  house: HouseIcon,
  shield: ShieldCheckIcon,
}

/** Decorative icon for a service category. */
export const ServiceIcon = ({
  name,
  ...props
}: { name: ServiceIconName } & LucideProps) => {
  const Icon = SERVICE_ICONS[name]
  return <Icon aria-hidden {...props} />
}
