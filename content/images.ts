import type { ImageAsset } from '@/types/content'

/**
 * Placeholder photography from Unsplash — PLACEHOLDER CONTENT.
 * Swap each entry for the real brand asset; components only reference keys.
 */
const unsplash = (id: string, alt: string): ImageAsset => ({
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`,
  alt,
  width: 1600,
  height: 1067,
})

export const PLACEHOLDER_IMAGES = {
  windowCleaning: unsplash(
    '1581578731548-c64695cc6952',
    'Cleaner in protective goggles and gloves wiping a window frame'
  ),
  vacuuming: unsplash(
    '1527515637462-cff94eecc1ac',
    'Cordless vacuum cleaner lifting confetti off a carpet'
  ),
  gloves: unsplash(
    '1584820927498-cfe5211fd8bf',
    'Technician pulling on protective nitrile gloves'
  ),
  sprayBottle: unsplash(
    '1563453392212-326f5e854473',
    'Gloved hand holding a cleaning spray bottle'
  ),
  bathroom: unsplash(
    '1584622650111-993a426fbf0a',
    'Bright, freshly cleaned bathroom with a glass shower'
  ),
  bedroom: unsplash(
    '1595526114035-0d45ed16cfbf',
    'Tidy bedroom with freshly made bed and natural light'
  ),
} as const satisfies Record<string, ImageAsset>
