import type { ImageAsset } from '@/types/content'

/**
 * Placeholder photography from Unsplash — PLACEHOLDER CONTENT.
 * Swap each entry for the real brand asset; components only reference keys.
 */
const unsplash = (id: string, alt: string, params = ''): ImageAsset => ({
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80${params}`,
  alt,
  width: 1600,
  height: 1067,
})

/**
 * Fakes a "before" shot from the same photo using imgix adjustments
 * (desaturated, darker, flatter). Real before/after pairs replace both URLs.
 */
const BEFORE_PARAMS = '&sat=-60&exp=-20&con=-20&sepia=35'

export const unsplashBeforeAfter = (
  id: string,
  subject: string
): { before: ImageAsset; after: ImageAsset } => ({
  before: unsplash(id, `${subject} before cleaning`, BEFORE_PARAMS),
  after: unsplash(id, `${subject} after cleaning`),
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
  floorCleaning: unsplash(
    '1581578949510-fa7315c4c350',
    'Cleaner in a face mask scrubbing a hallway floor'
  ),
  livingRoom: unsplash(
    '1560448204-e02f11c3d0e2',
    'Bright, spotless living room with cream sofas'
  ),
  villa: unsplash(
    '1600585154340-be6161a56a0c',
    'Modern villa with glass walls at dusk'
  ),
  commercialMopping: unsplash(
    '1603712725038-e9334ae8f39f',
    'Cleaner mopping a commercial lobby floor at sunset'
  ),
  villaPool: unsplash(
    '1600596542815-ffad4c1539a9',
    'White villa with a private swimming pool'
  ),
  plantsLounge: unsplash(
    '1502672260266-1c1ef2d93688',
    'Sunlit lounge filled with house plants'
  ),
  robotVacuum: unsplash(
    '1558317374-067fb5f30001',
    'Robot vacuum cleaning a grey rug'
  ),
  minimalBathroom: unsplash(
    '1552321554-5fefe8c9ef14',
    'Minimal white bathroom with a plant on the windowsill'
  ),
  familyLounge: unsplash(
    '1600210492486-724fe5c67fb0',
    'Living room with leather sofa and gallery wall'
  ),
  yellowChair: unsplash(
    '1586023492125-27b2c045efd7',
    'Yellow armchair beside a floor lamp in a clean room'
  ),
} as const satisfies Record<string, ImageAsset>
