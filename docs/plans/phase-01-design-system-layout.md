# Phase 1: Design system and global layout

**Status:** Done (2026-11-14). Branch: `feat/phase-01-layout`.

## Context

Phase 0 is done. It delivered the tooling, the theme tokens, a basic layout shell, and a placeholder home page with a hero and three service cards. The roadmap in `docs/plans/README.md` on `origin/main` scopes Phase 1 as **the design system and global layout**. The user confirmed that scope. Pages follow in Phases 2–5 as planned.

The goal is a modern, attractive, polished site shell modelled on ppjsolutions.com, plus a kit of reusable section building blocks. With those in place, Phases 2–5 only compose sections.

**Decisions made**

- **Copy is hybrid.** Short copy is realistic: nav, service names, headings, buttons and labels. Body paragraphs and descriptions are lorem ipsum. All copy lives in `content/`.
- **Images come from Unsplash.** They are direct `images.unsplash.com` URLs stored in `content/`. `next.config.ts` already allows that host in `remotePatterns` and in the CSP `img-src`, so no config change is needed.
- **The only interactive extra is the special-offer popup.** The before/after slider, the form UI and the chat launcher are left for later phases.
- **No new npm dependencies.** Embla, motion, Radix and sonner are already installed. The one addition is the shadcn `breadcrumb` primitive, generated through the shadcn CLI. It is copied into the repo and is not a new package.

## Step 0: Housekeeping

1. Bring local `development` up to date: `git pull --ff-only`. It is one commit behind `origin/development`, and the missing commit holds `docs/plans/`.
2. Create the branch `feat/phase-01-layout` from `development`.
3. Save this plan as `docs/plans/phase-01-design-system-layout.md` with status `In progress`. In `docs/plans/README.md`, set Phase 1 to `In progress` and link the plan.

## Step 1: Design-system foundations

**Tokens and utilities** (`app/globals.css`), added only where the components need them:

- an `--overlay` / `--overlay-foreground` token for text on top of images (hero banners)
- an `eyebrow` text utility, and a `section-sm` rhythm variant if one is needed
- shadow tokens if cards need them

**Content types** (`types/content.ts` and `types/site.ts`):

- `ImageAsset` = `{ src, alt, width, height }`
- `image` and `description` on `ServiceCategory`, used by the mega-menu
- `Certification`, `PromoOffer` and `BreadcrumbItem`

## Step 2: Shared building blocks (`components/shared/`)

Each one is a Server Component unless noted.

| Component         | Purpose                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `SectionHeading`  | Eyebrow, title, description and alignment. Can render as `h1` or `h2`. Replaces the hand-written headings in `ServicesOverview`. |
| `ServiceIcon`     | Moves the `SERVICE_ICONS` map out of `sections/home/ServicesOverview.tsx` so it can be reused.                                   |
| `PageHero`        | Inner-page banner: background image, overlay, `h1`, description and breadcrumbs. Phases 3–5 use it.                              |
| `Breadcrumbs`     | Built on the shadcn `breadcrumb` primitive, with `rtl:rotate-180` separators. Adds `getBreadcrumbJsonLd()` to `lib/seo.ts`.      |
| `CtaBand`         | Full-width band on the `inverse` token: call, WhatsApp and quote buttons. Reads from `SITE_CONFIG`.                              |
| `ContactActions`  | Shared phone, WhatsApp and quote button group, used by the header, drawer, `CtaBand` and the popup.                              |
| `Reveal` (client) | Scroll fade-in or slide-in built on `motion`. It does nothing when the user prefers reduced motion.                              |

## Step 3: Global layout polish (`components/layout/`)

**TopBar**

- Add the second phone number and the address on large screens.
- Keep it hidden below `md`.

**Header**

- **Sticky behaviour:** the header shrinks and gains a shadow on scroll. This needs a small client wrapper, `HeaderShell`, and `hooks/useScrolled.ts`.
- **Active link:** highlight the current route through a `NavLink` client leaf that uses `usePathname`.

**MainNav**

- Turn the Services dropdown into a mega-menu: each category shows its icon, title and lorem description, plus a featured Unsplash image card. The data comes from `SERVICE_CATEGORIES`.

**MobileNav drawer**

- Services become an accordion, using the existing `components/ui/accordion`.
- Active link state.
- Contact actions, hours and socials, plus the theme switcher.
- The drawer closes when the user navigates.

**Footer**

- Add a certifications row with placeholder badge tiles (lucide icons and labels from `content/site.ts`).
- Add an "Always online / 24/7" block and a legal row for the policies.
- Keep the cached `CopyrightYear`.

**WhatsAppButton**

- Add an entrance animation and a soft pulse, both guarded by `motion-safe`.
- Add a tooltip-style label on large screens.

## Step 4: Special-offer popup

- **Content:** `content/promo.ts` holds `enabled`, `id`, title, lorem body, an Unsplash image, CTA label and href, and `delayMs`.
- **Component:** `components/shared/PromoDialog.tsx` is a client leaf built on `components/ui/dialog`.
  - It opens after a delay, once per session.
  - It remembers dismissal with `sessionStorage` keyed by `promo.id`, wrapped in try/catch.
  - It is suppressed on `/contact`.
  - Opening and closing animations are turned off under `motion-reduce`.
  - It is labelled through the dialog title and description.
- **Placement:** rendered in `app/(site)/layout.tsx`.

## Step 5: Living style guide

- Add a route at `app/(site)/styleguide/page.tsx` (thin), composing `sections/styleguide/*`.
- It shows:
  - colour tokens
  - typography
  - buttons, badges and cards
  - `SectionHeading`, `PageHero` with breadcrumbs, `CtaBand` and `Reveal`
- It is set to `robots: { index: false }` and left out of `sitemap.ts`, so it serves as the visual QA surface for the theme in light and dark.

**Home page:** only refactor `ServicesOverview` to use `SectionHeading` and `ServiceIcon`. The full home page is Phase 2.

## Critical files

- **Modified:**
  - `app/globals.css`
  - `types/content.ts` and `types/site.ts`
  - `content/site.ts` and `content/services.ts`
  - `components/layout/*`
  - `components/shared/WhatsAppButton.tsx`
  - `app/(site)/layout.tsx`
  - `lib/seo.ts`
  - `sections/home/ServicesOverview.tsx`
- **New:**
  - `components/shared/{SectionHeading,ServiceIcon,PageHero,Breadcrumbs,CtaBand,ContactActions,Reveal,PromoDialog}.tsx`
  - `components/layout/{HeaderShell,NavLink}.tsx`
  - `components/ui/breadcrumb.tsx`
  - `hooks/useScrolled.ts`
  - `content/promo.ts`
  - `app/(site)/styleguide/page.tsx` and `sections/styleguide/*`
  - `docs/plans/phase-01-design-system-layout.md`

## Rules applied throughout

- Theme tokens only, and logical properties for RTL.
- `React.useX` hooks, arrow-function components and `as const satisfies`.
- `'use client'` only on the leaves listed above.
- One `h1` per page, labelled controls, `aria-hidden` on icons, visible focus states.

## Verification

1. Run `yarn check` and `yarn build`. Both must pass, and all routes must still be statically prerendered with no Cache Components errors.
2. Run `yarn dev` and check `/` and `/styleguide`:
   - in light and dark mode
   - at 360px, 768px and 1280px
   - with keyboard navigation through the mega-menu and the drawer
   - with the popup appearing once and staying closed after dismissal or a reload in the same session
   - with reduced motion emulated in DevTools
3. Confirm that Unsplash images load under the CSP, with no console violations.
4. Finish:
   - Fill in the **Outcome** section of the plan and set its status to `Done`.
   - Update the roadmap.
   - Ask before committing and opening the PR into `development`.

## Outcome

### Delivered

- **Tokens** (`app/globals.css`):
  - `overlay` and `overlay-foreground` for text on photography
  - `eyebrow` and `section-sm` utilities
  - a global reduced-motion safety net, needed because `tw-animate-css`, which every shadcn primitive uses, ignores the preference
- **Content:**
  - `content/images.ts` holds the Unsplash placeholders in one place to swap later.
  - `content/promo.ts` and `content/cta.ts` hold the popup and CTA band copy.
  - Service categories gained `tagline` and `image`. `SERVICE_NAV_ITEMS` now feeds the header, the drawer and the footer from one source.
  - The site config gained `ctas`, `availability` and `certifications`.
- **Shared blocks** (`components/shared/`):
  - `SectionHeading`, `ServiceIcon`, `PageHero`, `CtaBand`, `ContactActions`
  - `Breadcrumbs`, with BreadcrumbList JSON-LD from `getBreadcrumbJsonLd()` in `lib/seo.ts`
  - `Reveal`, which uses motion with `reducedMotion="user"`
  - `PromoDialog`
- **Layout:**
  - **TopBar:** both phones, address and hours.
  - **Header:** the sticky `HeaderShell` shrinks and gains a shadow on scroll (`hooks/useScrolled.ts`). A call block sits beside the CTA.
  - **Desktop menu:** a Services mega-menu with icons, taglines and a featured image card.
  - **Active links:** `NavLink` marks the current route (`data-active` and `aria-current`) and carries its own Suspense boundary.
  - **Mobile drawer:** full width, a services accordion, contact actions, hours, socials and the theme switcher.
  - **Footer:** a 12-column layout, an "Always online" pill, the certifications strip and a labelled legal nav.
  - **WhatsApp button:** entrance animation, pulse, and a hover label on large screens.
- **Promo popup:**
  - Opens after 6 s, once per session (`sessionStorage`, wrapped in try/catch).
  - Skips `/contact` and `/styleguide`.
  - Waits while the drawer or a menu is open.
  - Has a visible close button over the photo.
- **Style guide:** `/styleguide` shows tokens, typography, components, `PageHero` with breadcrumbs, and `CtaBand`. It is `noindex, nofollow` and left out of the sitemap.
- **Home:** `ServicesOverview` now uses image cards with `SectionHeading`, `ServiceIcon` and `Reveal`.
- **Verified:**
  - `yarn check` and `yarn build` pass, and all routes are still statically prerendered.
  - Screenshots through Chrome device emulation (CDP):
    - 360px and 1440px, light and dark, reduced motion
    - the mega-menu and the drawer open
    - no horizontal overflow at 360px and no CSP violations
  - Popup checks: it opens and the dismissal is stored, it waits while the drawer is open, and it never opens on excluded routes.

### Changes from the plan

- **Contact link helpers moved to `lib/contact.ts`.** `getWhatsAppUrl` and the new `getTelHref` left `lib/seo.ts`, so client components such as the drawer can use them without bundling `lib/env` validation into the browser.
- **The `ServiceIcon` type was renamed to `ServiceIconName`** to free the name for the component.
- **`PageHero` uses a CSS entrance animation instead of `Reveal`**, so the `h1` (the LCP element) paints immediately.
- **No separate shadow tokens were needed.** Shadows use `shadow-heading/5` tints.

### Still open

- **404 prefetches.** Nav and footer links to `/about`, `/blog`, `/services` and the policy pages still return 404 until Phases 3–5 build those routes. Their prefetches show up as console 404s.
- **The style guide is a dev reference.** Remove it or gate it before launch.
- **The vendored sheet uses `right-0`** rather than a logical property. Revisit during the RTL pass in Phase 7.
