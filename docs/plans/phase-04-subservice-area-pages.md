# Phase 4: Sub-service and area pages

**Status:** Done (2026-11-14). Branch: `feat/phase-04-subservice-area-pages`.

## Context

Phase 3 shipped `/services` and one template-driven page per category. The roadmap's Phase 4 adds deeper pages generated from content. The reference site has one page per service and area (for example `/service/pest-control-al-bateen/`). It has no sub-service pages; its sub-services only book on WhatsApp.

**Decisions**

- **Area pages are per service and area:** `/services/<service>/areas/<area>`. With dummy data that is 3 × 32 = 96 pages.
- **Sub-service pages are optional per sub-service:** `/services/<service>/<sub-service>`. A page exists only when the sub-service has a `detail` block in content. Otherwise its card stays WhatsApp-only.
- **Unknown URLs get a real 404:** `proxy.ts` checks `/services/*` against content-derived valid paths before rendering.
- **The content-disposable rule applies.** Everything derives from `content/services/*` and `content/areas.ts`. Areas stay a list of names, and slugs are generated from them. Area page text comes from templates in `content/service-page.ts`.

## Plan

### Content and types

- **`SubService.detail?`:** `{ description: string[], included?: string[], image?, faqs? }`. Give 2–3 dummy sub-services per category a detail block.
- **`content/areas.ts`:** add `slugify`-based `getAreaSlug(name)` and `getAreaBySlug(slug)`.
- **`content/service-page.ts`:** templates for sub-service and area pages (titles, intro text, "other areas", "related services").
- **Reserved slug:** `areas` is reserved and cannot be a sub-service slug. Document it in the guide.

### Routes

All three use `generateStaticParams`, read `params` inside `<Suspense>` and reuse `ServicePageSkeleton`.

- **`app/(site)/services/[slug]/[sub]/page.tsx`:** category × detailed sub-services.
- **`app/(site)/services/[slug]/areas/[area]/page.tsx`:** category × areas.
- **Empty lists:** under Cache Components, `generateStaticParams` must return at least one entry. When content yields none, return a sentinel that resolves to `notFound()`.
- **Metadata:** title, description, canonical URL and OG image per page.
- **JSON-LD:** Service JSON-LD. On area pages `areaServed` is that single area.

### Templates (`sections/services/`)

**`SubServicePage`**

- hero with breadcrumbs, price and WhatsApp booking
- description, "What's included" and image
- FAQs: its own, falling back to the category's
- related sub-services, areas, enquiry form and CTA band

**`ServiceAreaPage`**

- hero ("{Service} in {Area}")
- templated intro
- the category's sub-services, plans, benefits and FAQs
- links to the same service in other areas
- enquiry form with the service and area prefilled, then the CTA band

Both reuse the Phase 3 sections. Every section stays optional.

### Links

- **`SubServiceGrid`:** "Learn more" when a sub-service has a page. "Book now" stays.
- **`AreasServed`:** chips become links when shown for a service.
- **`EnquiryForm`:** gains `defaultArea`.

### SEO and 404

- **Sitemap:** add the sub-service and area pages.
- **`proxy.ts`:** with matcher `/services/:path*`, unknown paths are rewritten to a non-existent route, so the root not-found page renders with status 404.

### Docs

Update `docs/CONTENT-GUIDE.md` to cover sub-service detail and area pages.

## Verification

1. Run `yarn check` and `yarn build`. All new pages must be prerendered.
2. Check status codes: unknown `/services/x`, `/services/pest-control/x` and `/services/pest-control/areas/x` must return 404, and valid pages 200.
3. Take CDP screenshots of a sub-service page and an area page at 360px and 1440px. No overflow and no CSP errors.
4. Scripted checks:
   - "Learn more" appears only on sub-services that have a detail block
   - area chips link correctly
   - the form preselects the service and fills in the area
   - JSON-LD and canonical URLs are present
   - the sitemap count is right
5. Check the dev-mode console on each new page type, plus a client navigation into each.
6. Replaceability test (reverted afterwards):
   - With an empty areas list, the build passes and the area sections and pages disappear.
   - With no detail blocks, the build passes and there are no "Learn more" links.

## Outcome

### Delivered

- **Sub-service pages** (`/services/[slug]/[sub]`):
  - Generated for every sub-service with a `detail` block: 8 with dummy data.
  - Sections: hero with a WhatsApp message naming the sub-service, "What's included" (description, checklist, image, "From" price), FAQs (falling back to the category's), sibling sub-services, linked areas, the enquiry form and the CTA band.
- **Area pages** (`/services/[slug]/areas/[area]`):
  - 3 × 32 = 96 pages, titled "{Service} in {Area}".
  - Sections: a templated intro, then the category's sub-services, plans, benefits and FAQs, then 31 "other areas" links.
  - The enquiry form has the service preselected and the area prefilled, and the hero's WhatsApp message names the area.
  - Structured data `areaServed` lists that single area.
- **Live links:**
  - Sub-service cards show "Learn more" only when a page exists.
  - Area chips link to that service's area page.
- **Real 404s:** `proxy.ts` (matcher `/services` and `/services/:path*`) checks against `getAllServicePaths()` and rewrites unknown paths to `/_not-found`. Verified 404 for:
  - unknown services, sub-services and areas
  - sub-services without detail
  - `/services/<x>/areas`
  - the build placeholder

  Valid pages return 200.

- **Shared building blocks:**
  - `SectionStack` and `serviceSections.tsx`, used by the category, sub-service and area templates
  - `ContactActions.whatsappMessage`
  - `EnquiryForm` / `EnquirySection` `defaultArea`
  - `getAreaBookingMessage`
  - `getServiceJsonLd` overrides
- **Content helpers:**
  - `slugify` and area slugs (`AREAS`, `getAreaBySlug`)
  - `getSubServicePage`, `getAllServicePaths` and href helpers
  - a build-time guard for the reserved `areas` sub-service slug
  - `EMPTY_PARAM`, so `generateStaticParams` never returns an empty list under Cache Components
- **Sitemap:** derived from `getAllServicePaths()`, 109 URLs.
- **Docs:** `docs/CONTENT-GUIDE.md` covers sub-service detail, area pages and the reserved slug.
- **Verified:**
  - `yarn check` and `yarn build` pass, and every new page is prerendered.
  - Status codes as listed above.
  - Desktop screenshots look right, and nothing overflows at 360px.
  - Scripted checks: links, form prefill, structured data, canonical URLs and the sitemap count.
  - In dev mode, the console is clean on all new page types and on client navigations into a sub-service page and an area page.
  - Empty-content test (reverted): with no areas and no detail blocks, the build passes, the links and sections disappear, the sitemap drops to 5 URLs and the old URLs return 404.

### Changes from the plan

- **`data-scroll-behavior="smooth"`** was added to `<html>`, because Next warned about smooth scrolling during client navigations. This had existed since Phase 0 and only surfaced now.
- **Sub-service hero** always uses the category image. The detail image is shown in the "What's included" section instead, which avoids the same photo appearing twice and an unused image-preload warning.

### Still open

- **Templated area pages.** The 96 area pages are nearly identical. Once real content exists, give important areas unique text to help them rank.
- **Renaming an area changes its URL.** After launch, add redirects in `next.config.ts`.
- **Not-found page title.** It still uses the default site title. A dedicated title can be added later.
