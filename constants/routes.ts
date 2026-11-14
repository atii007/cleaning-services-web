/**
 * Top-level route segments served by static route folders in `app/(site)/`.
 * Policy pages share the top level (`/<policy-slug>`), so their slugs must
 * not clash with these, and the 404 proxy lets these through. Add a segment
 * here whenever a new top-level route folder is created.
 */
export const STATIC_TOP_LEVEL_SEGMENTS = [
  'about',
  'blog',
  'contact',
  'services',
  'styleguide',
] as const
