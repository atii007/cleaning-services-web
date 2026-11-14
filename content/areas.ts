import { slugify } from '@/lib/slug'

/**
 * Areas served — PLACEHOLDER CONTENT. Any length; leave the array empty to
 * hide every "Areas we serve" section. Phase 4 area pages derive from it.
 */
export const SERVICE_AREAS: readonly string[] = [
  'Airport Road',
  'Al Bandar',
  'Al Bateen',
  'Al Danah',
  'Al Falah',
  'Al Khaleej Al Arabi',
  'Al Khalidiyah',
  'Al Manaseer',
  'Al Markaziyah',
  'Al Maryah Island',
  'Al Mina',
  'Al Mushrif',
  'Al Nahyan',
  'Al Raha Beach',
  'Al Reef',
  'Al Reem Island',
  'Al Shamkha',
  'Al Wahda',
  'Al Wathba',
  'Al Zahiyah',
  'Baniyas',
  'Corniche',
  'Hamdan Street',
  'Khalifa City',
  'Madinat Zayed',
  'Masdar City',
  'Mohammed Bin Zayed City',
  'Mussafah',
  'Rabdan',
  'Saadiyat Island',
  'Shakhbout City',
  'Yas Island',
]

export type ServiceArea = { name: string; slug: string }

/** Areas with URL slugs derived from their names. */
export const AREAS: readonly ServiceArea[] = SERVICE_AREAS.map((name) => ({
  name,
  slug: slugify(name),
}))

export const getAreaBySlug = (slug: string) =>
  AREAS.find((area) => area.slug === slug)
