# Phase 2: Home page

**Status:** Done (2026-11-14). Branch: `feat/phase-02-home`.

## Context

Phase 1 delivered the design system, the global layout, the shared blocks and the promo popup. The site is deployed: `main` goes to Vercel production and `development` goes to preview.

The roadmap scopes Phase 2 as **the home page**, modelled on ppjsolutions.com. It has these sections:

- hero slider
- service cards
- before/after gallery
- testimonials
- client logos
- contact section
- latest blog posts

**Decisions made**

- **WhatsApp is the main conversion channel; email comes second.**
  - The contact form validates the enquiry, then opens WhatsApp with the message pre-filled. It works for real on production today and never loses an enquiry.
  - The roadmap's Phase 6 is re-scoped so that WhatsApp is primary and email delivery is optional.
- **Before/after uses a drag-to-compare slider plus a filterable gallery** that opens in a lightbox.
- **Extra section:** stats and "why choose us".
- **Copy follows the hybrid rule.** Short labels are realistic and long text is lorem ipsum. All of it lives in `content/`. Images come from Unsplash through `content/images.ts`.
- **No new dependencies.** We already have embla, motion, Radix, react-hook-form, Zod and sonner. Carousel autoplay is a small hook rather than the embla autoplay plugin.

## Step 0: Housekeeping

1. Make sure the `chore/docs-default-branch` PR is merged.
2. Update `development`, then branch `feat/phase-02-home`.
3. Save this plan as `docs/plans/phase-02-home-page.md` with status `In progress`.
4. In `docs/plans/README.md`:
   - set Phase 2 to `In progress`
   - reword Phase 6 to: WhatsApp-first enquiries, with optional email delivery, server action and spam protection, plus the chat widget

## Step 1: Content and types

**New types** in `types/content.ts`:

- `HeroSlide`
- `Stat`
- `TrustPoint`
- `BeforeAfterItem` (title, service slug, `before` and `after` images)
- `Testimonial` (name, area, service, rating, quote)
- `ClientLogo`
- `BlogPost` (slug, title, excerpt, ISO date, read minutes, category, image)

**New content files** in `content/`:

| File              | Holds                                                             |
| ----------------- | ----------------------------------------------------------------- |
| `home.ts`         | Hero slides (3), section headings, stats (4) and trust points (4) |
| `gallery.ts`      | 6–8 before/after items across the 3 services                      |
| `testimonials.ts` | About 6 testimonials                                              |
| `clients.ts`      | About 10 client logos                                             |
| `blog.ts`         | 6 posts, plus `getLatestPosts(n)`                                 |

**Rules for placeholder content**

- **Testimonials:** lorem quotes, first name plus last initial, and initials avatars. There is no "Google reviews" claim and no AggregateRating JSON-LD until the reviews are real, so nothing fake is presented as genuine on the live site.
- **Client logos:** fictional wordmarks (lucide icon plus a generic name), never real companies.
- **Before/after photos:** each placeholder pair uses one Unsplash photo. The "before" version adds imgix parameters (`sat`, `exp`, `con`, `sepia`) to make it look dull and grimy. Real pairs simply replace both URLs later. Test the parameters, and the Unsplash IDs, during implementation.

**WhatsApp-first CTA changes**

- `SITE_CONFIG.ctas.quote.href` and `PROMO_OFFER.cta.href` change to `/#contact`, the home contact section. Visitors are no longer sent to a 404 before Phase 5.
- In the `ContactActions` default order, WhatsApp comes first.
- In the header, the primary button becomes the green "WhatsApp us" button. The phone block stays.

## Step 2: Sections (`sections/home/`)

The final order of sections in `app/(site)/page.tsx`. Client components are marked; everything else is a Server Component.

1. **`HeroSlider`** (client), which replaces `HomeHero`:
   - full-bleed slides with an overlay and the slide copy
   - WhatsApp as the primary CTA and quote as the secondary
   - a trust-points row
   - only slide 1 renders the page's `<h1>`, and its image gets `priority` for LCP; the other slides use `<p>` headings
   - built on `components/ui/carousel` with a `useAutoplay(api)` hook in `hooks/`, which:
     - advances every 6 s
     - pauses on hover, focus or a hidden tab
     - is off under reduced motion
   - has dots, previous and next buttons, and a pause/play button (WCAG 2.2.2)
   - carries `aria-roledescription="carousel"`, and each slide gets `aria-label="n of N"`
2. **`ServicesOverview`:** keep it as is.
3. **`WhyChooseUs`:** four stats with a `CountUp` client leaf, plus four trust points beside an image.
   - `CountUp` renders the final value on the server, animates it once when it scrolls into view, and shows the final value under reduced motion.
4. **`BeforeAfter`**
   - **`BeforeAfterSlider`** (client, in `components/shared/`): two stacked images, with the "before" image clipped through a CSS variable.
     - It is driven by a visually hidden `<input type="range">`, so the keyboard, screen readers and touch work natively.
     - The handle is decorative.
     - It is RTL-aware: the clip direction flips under `rtl:`.
   - A featured slider, plus a `GalleryGrid` client leaf:
     - filter tabs (All, then each service)
     - thumbnail cards that open a `Dialog` lightbox containing the slider
5. **`Testimonials`:** a carousel of review cards with stars, quote, initials avatar, name, area and service. It uses the same autoplay hook and arrows, shows 1, 2 or 3 cards depending on the breakpoint, and has a WhatsApp CTA underneath.
6. **`ClientLogos`:** an infinite CSS marquee.
   - It is duplicated, with the copy `aria-hidden`.
   - It pauses on hover.
   - Under reduced motion it falls back to a static wrapped grid.
7. **`ContactSection`** (`id="contact"`):
   - **Left:** a contact panel on the inverse surface: WhatsApp (featured), phones, email, address and hours.
   - **Right:** an `EnquiryForm` client leaf.
8. **`LatestPosts`:** three cards with image, category, date (formatted with `Intl` on the server), title, excerpt and a link to `/blog/<slug>`. There is also a "View all" link to `/blog`. Both routes are built in Phase 5.

**Home page metadata:** keep the root defaults. No new JSON-LD.

## Step 3: WhatsApp enquiry form

**Schema:** `schemas/enquiry.ts` defines `enquirySchema` with Zod:

| Field           | Rule                                                |
| --------------- | --------------------------------------------------- |
| `name`          | Required                                            |
| `phone`         | Required, simple phone regex                        |
| `service`       | Required, an enum of the service slugs plus `other` |
| `area`          | Optional                                            |
| `preferredDate` | Optional                                            |
| `message`       | Optional, at most 500 characters                    |

**Message builder:** `lib/contact.ts` gains `buildEnquiryMessage(values)`, which writes a readable multi-line WhatsApp message. It reuses `getWhatsAppUrl(message)`.

**`EnquiryForm`**

- Uses react-hook-form with `zodResolver(enquirySchema)` and the `components/ui/field`, `input`, `select` and `textarea` primitives.
- Has inline errors and `aria-invalid`.
- On a valid submit:
  - it opens `wa.me` in a new tab, falling back to `location.href` if the popup is blocked
  - it shows a sonner toast
  - it resets the form
- A short note under the button explains that sending opens WhatsApp. A secondary "or call us" link follows it.

The schema is shared, so Phase 6 can add an email or server-action path without touching the UI.

## Critical files

- **New:**
  - `sections/home/{HeroSlider,WhyChooseUs,BeforeAfter,GalleryGrid,Testimonials,ClientLogos,ContactSection,EnquiryForm,LatestPosts}.tsx`
  - `components/shared/{BeforeAfterSlider,CountUp}.tsx`
  - `hooks/useAutoplay.ts`
  - `schemas/enquiry.ts`
  - `content/{home,gallery,testimonials,clients,blog}.ts`
  - `docs/plans/phase-02-home-page.md`
- **Modified:**
  - `app/(site)/page.tsx`
  - `types/content.ts`
  - `content/{site,promo,images}.ts`
  - `components/shared/ContactActions.tsx`
  - `components/layout/Header.tsx`
  - `lib/contact.ts`
  - `docs/plans/README.md`
- **Removed:** `sections/home/HomeHero.tsx`, which `HeroSlider` replaces.
- **Reused:**
  - `SectionHeading`, `Reveal`, `ContactActions`, `ServiceIcon`
  - `PLACEHOLDER_IMAGES`, `getWhatsAppUrl`, `SERVICE_CATEGORIES`
  - the carousel, dialog, field, select and sonner primitives

## Rules applied throughout

- Theme tokens only, and logical properties for RTL.
- `'use client'` only on the leaves listed above.
- One `h1`, and `aria-labelledby` on every section.
- Animations respect reduced motion.
- Prefer CSS for entrances above the fold.
- All copy lives in `content/`.

## Verification

1. Run `yarn check` and `yarn build`. Both must pass, and `/` must stay statically prerendered.
2. Use the CDP screenshot script (in the scratchpad) on `/`:
   - at 360px, 768px and 1440px
   - in light and dark mode
   - with reduced motion on
   - checking for no horizontal overflow and no CSP errors
3. Interaction checks:
   - **Hero autoplay:** advances, pauses on hover or focus, the pause button works, and it is off under reduced motion.
   - **Before/after slider:** works by drag, keyboard arrows and touch.
   - **Gallery:** the filter works, and the lightbox opens and traps focus.
   - **Enquiry form:** shows validation errors. A valid submit produces the right `wa.me` URL with the message encoded, a toast, and a reset form.
4. Finish:
   - Fill in the plan's **Outcome**, set its status to `Done` and update the roadmap.
   - Ask before committing and pushing.
   - Give you the PR link, since `gh` isn't installed.

## Outcome

### Delivered

- **Home page** in this order: `HeroSlider`, `ServicesOverview`, `WhyChooseUs`, `BeforeAfter`, `Testimonials`, `ClientLogos`, `ContactSection` (`#contact`) and `LatestPosts`. `HomeHero` is removed. `/` is still statically prerendered.
- **Hero slider:** 3 full-bleed slides.
  - Slide 1 carries the only `h1` and the priority (LCP) image.
  - Inactive slides are `inert`.
  - Dots, previous and next, and a pause/play toggle come from `CarouselControls`.
  - `useAutoplay` advances every 6 s. It pauses on hover or focus, on a hidden tab, or when the visitor pauses it. It never runs under reduced motion. A manual slide change restarts the countdown.
- **Why choose us:**
  - an image with a floating rating card
  - 4 trust points
  - 4 stats using `CountUp`, which renders the final value on the server and counts up when in view
- **Before/after:**
  - `BeforeAfterSlider` is driven by a transparent native range input, so mouse, touch, keyboard and screen readers all work. It is RTL-aware.
  - A featured comparison sits above `GalleryGrid`, which has `aria-pressed` service filters and a `Dialog` lightbox.
- **Testimonials:** a carousel showing 1, 2 or 3 cards by breakpoint, with initials avatars, an accessible star rating, autoplay and a WhatsApp CTA.
- **Client logos:** a CSS marquee using `animate-marquee` and an RTL variant, with an edge fade (`mask-x-*`) and pause on hover. Under reduced motion it becomes a static wrapped grid.
- **Contact:**
  - A dark panel with a featured WhatsApp card, phones, email, address, hours and socials.
  - `EnquiryForm` (react-hook-form with `enquirySchema` in `schemas/enquiry.ts`) validates, then opens WhatsApp with a message built by `buildEnquiryMessage()` in `lib/contact.ts`. If pop-ups are blocked it falls back to the same tab. It then shows a toast and resets.
- **Latest posts:** the 3 newest posts from `content/blog.ts`, with dates formatted on the server.
- **WhatsApp-first CTAs:**
  - The header's primary button is now green "WhatsApp us".
  - `ContactActions` lists WhatsApp first.
  - The quote, promo and mega-menu CTAs point to `/#contact` instead of the not-yet-built `/contact`.
- **Content:** `content/{home,gallery,testimonials,clients,blog}.ts` are new, and `content/images.ts` gained more Unsplash photos. Fake "before" shots use imgix parameters through `unsplashBeforeAfter()`.
- **New hooks:** `useAutoplay`, `useCarouselIndex` and `usePrefersReducedMotion`.
- **Verified:**
  - `yarn check` and `yarn build` pass.
  - CDP screenshots at 360px and 1440px, light and dark, with reduced motion. No horizontal overflow and no CSP errors.
  - Scripted interaction tests:
    - hero autoplay advances, the pause button holds it, and it is off under reduced motion
    - the compare slider updates
    - the gallery filter shows 2 pest-control items, and the lightbox opens and closes on Escape
    - submitting the form empty shows 3 errors
    - a valid submit produces the expected `wa.me` message, a toast and a reset form

### Changes from the plan

- **Two extra hooks.** `useCarouselIndex` and `usePrefersReducedMotion` were split out next to `useAutoplay`, and the new shared `CarouselControls` is used by both carousels.
- **Form copy.** The form and panel copy live in `content/home.ts` (`ENQUIRY_FORM`, `CONTACT_PANEL`).
- **Hero wrapper.** The carousel itself is the labelled region, so the hero wrapper is a `div` rather than a second labelled `section`.

### Still open

- **Placeholder content.** Testimonials, client names and before/after shots are placeholders. Add AggregateRating JSON-LD only once the reviews are real.
- **Blog routes.** `/blog` and `/blog/<slug>` links return 404 until Phase 5.
- **Pop-up fallback.** Safari may block `window.open` after async validation. In that case the form falls back to opening WhatsApp in the same tab, which is acceptable on mobile.
