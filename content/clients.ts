import type { ClientLogo } from '@/types/content'

/** Client wordmarks — PLACEHOLDER CONTENT (fictional names). */
export const CLIENT_LOGOS = [
  { name: 'Northwind Towers', icon: 'building' },
  { name: 'Azure Suites', icon: 'hotel' },
  { name: 'Crescent Clinic', icon: 'hospital' },
  { name: 'Brightpath Academy', icon: 'school' },
  { name: 'Palm Market', icon: 'store' },
  { name: 'Delta Works', icon: 'factory' },
  { name: 'Harbor Civic', icon: 'landmark' },
  { name: 'Dune Logistics', icon: 'warehouse' },
  { name: 'Oasis Residences', icon: 'building' },
  { name: 'Falcon Hotels', icon: 'hotel' },
] as const satisfies readonly ClientLogo[]
