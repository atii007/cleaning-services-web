# Phase 3: Service category template

**Status:** Done (2026-11-14). Branch: `feat/phase-03-service-template`.

## Context

Phases 0–2 are live at https://cleaning-services-web-two.vercel.app/. The nav, footer and home cards link to `/services` and `/services/{deep-cleaning,maid-services,pest-control}`, and all of those return 404 today.

The roadmap scopes Phase 3 as **one template that drives the three category pages**:

- hero
- sub-service grid
- content blocks
- comparison table
- benefits
- FAQ
- served areas

It is modelled on the ppjsolutions.com category pages. A reference page has these parts:

- a hero with breadcrumbs and Call/WhatsApp buttons
- an intro with a bullet list
- 9 sub-service cards, each with "Book Now" on WhatsApp
- content blocks with bullet lists
- 15 FAQs
- 41 areas served

**Decisions made**

- **Comparison table:** shows **dummy prices**. The currency is a single setting in `content/site.ts`, defaulting to **USD**. All data is replaced once the real content arrives.
- **Sub-service cards:** "Book now" opens WhatsApp with the sub-service pre-filled. "Learn more" links arrive in Phase 4 together with the sub-service pages, so there are no 404s in between.
- **Areas served:** plain chips for now. They become links in Phase 4.
- **Copy and images:** the hybrid rule applies (realistic labels, lorem paragraphs). Images are reused from `content/images.ts`. WhatsApp stays the primary CTA ([[whatsapp-first]]).
- **Dependencies:** none new.

## Guiding principle: content is disposable, so the template must not care

The services are dummies modelled loosely on the reference site. The real ones may differ in **number, names, sub-services, prices, plans, FAQs and areas**. Replacing them must mean editing `content/` only, with no component or route changes.

- **One file per category is the single source of truth.** Each `content/services/<slug>.ts` exports one full category: card summary plus page detail. `content/services/index.ts` collects them into `SERVICE_CATEGORIES`. These all derive from that array:
  - nav, mega-menu, mobile drawer and footer links
  - home and `/services` cards
  - the enquiry form's service options and its Zod enum
  - `generateStaticParams`, the sitemap and JSON-LD
  - Adding, removing or renaming a category means adding, deleting or editing one file plus one line in `index.ts`. Nothing hard-codes "3 categories" or a specific slug.
- **Every page section is optional.** The template renders a section only when its data exists. For example, a category without plans gets no comparison table, and an empty `faqs` gets no FAQ. Array lengths are free: 2 sub-services or 12, 1 plan or 4, any number of feature rows.
- **Icons are chosen by string key from one registry,** `lib/icons.ts`, which maps a generous set of lucide icons.
  - This replaces the fixed 3-value `ServiceIconName` union and the per-component icon maps.
  - Content picks any key. Adding an icon is one line in the registry.
  - Keys stay serialisable, so client components such as the mobile drawer keep working.
- **Prices are plain numbers** formatted by `formatPrice` with the site currency. Switching USD → PKR, or to real prices, is data only. Plans have a free-form `unit` ("per visit", "/month").
- **Areas served are a site-level list** that may be empty. If it is empty, the section disappears. Phase 4 area pages derive from the same list.
- **Nothing in the components is specific to one service.** No `if (slug === 'pest-control')`.
- **`docs/CONTENT-GUIDE.md`** explains how to add, remove or replace a category, sub-service, plan, FAQ, area or image, and which fields are optional.

## Step 0: Housekeeping

1. Update `development`, which should now include the PR checks change, and branch `feat/phase-03-service-template`.
2. Save this plan as `docs/plans/phase-03-service-category-template.md` with status `In progress`.
3. Set Phase 3 to `In progress` in the roadmap.

## Step 1: Types and content

**Types** in `types/content.ts`:

- `ServiceDetail`:
  - hero copy
  - intro (paragraphs, bullets, image)
  - `subServices[]`
  - `blocks[]` (title, paragraphs, bullets, image)
  - `plans[]` (name, `price`, `unit`, `popular?`)
  - `planFeatures[]` (a label plus one value per plan: included, not included, or a short text)
  - `benefits[]`
  - `faqs[]` (q, a)
- `SubService`: slug (reserved for Phase 4 routes), title, summary, icon key and optional `priceFrom`
- **Optional fields:** every section field on `ServiceDetail` is optional.
- **Icons:** all icon fields (services, sub-services, benefits, trust points, client logos) use one `IconName` type, which is the keys of the `lib/icons.ts` registry. This replaces `ServiceIconName`, `TrustPointIcon` and `ClientLogoIcon`.

**Content**

The `content/services.ts` file becomes a `content/services/` folder.

| File                                                             | Holds                                                                                                                                 |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `content/services/{deep-cleaning,maid-services,pest-control}.ts` | One full category each. Dummy data: about 6 sub-services, 2 content blocks, 3 plans with 6–8 feature rows, 4–6 benefits and 6–8 FAQs. |
| `content/services/index.ts`                                      | `SERVICE_CATEGORIES` (ordered array), `getServiceCategory(slug)`, `getServiceHref` and `SERVICE_NAV_ITEMS`                            |
| `content/areas.ts`                                               | Placeholder area names. Any length, and may be empty.                                                                                 |

`SITE_CONFIG` gains `currency: { code: 'USD', locale: 'en-US' }`, and `formatPrice(amount)` is added in `lib/format.ts` (uses `Intl.NumberFormat`, runs on the server).

## Step 2: Shared pieces (reuse first)

- **`PageHero`:** add an optional `actions` slot. Service pages pass `ContactActions` (WhatsApp, call) into it.
- **`ServiceCategoryGrid`:** move the card grid out of `sections/home/ServicesOverview.tsx` into `components/shared/`, so the home page and `/services` both use it.
- **`EnquirySection`:** move `ContactSection` and `EnquiryForm` from `sections/home/` to `components/shared/`.
  - Add a `defaultService` prop, so a category page preselects its own service in the form.
  - The section keeps `id="contact"`.
  - On service pages the quote CTA targets that page's own `#contact`.
- **`lib/contact.ts`:** add `getBookingMessage(category, subService)`, which writes "Hi, I'd like to book {sub} ({category})…" for `getWhatsAppUrl`.

## Step 3: Sections (`sections/services/`)

All are Server Components unless marked otherwise.

1. **Hero:** `PageHero` with breadcrumbs (Home › Services › {Category}), the category image, the `h1`, a tagline, and WhatsApp and call actions.
2. **`ServiceIntro`:** two columns. Text, a checklist of bullets and an image, plus a small "From {price}" badge.
3. **`SubServiceGrid`:** cards showing icon, title, summary, "From {price}" and a green **Book now** button (WhatsApp link with the pre-filled booking message). It uses `Reveal`.
4. **`ServiceContentBlocks`:** alternating image and text rows with bullet lists. The alternation uses logical properties, so it works in RTL.
5. **`PlansComparison`:**
   - From `lg` up, a semantic `<table>` with a `<caption>`, `scope` headers, a highlighted "Most popular" column, a price row and WhatsApp CTAs.
   - Below `lg`, stacked plan cards. The table is `hidden` there, so screen readers never get both.
   - Check and cross icons carry `sr-only` "Included" / "Not included" text.
6. **`ServiceBenefits`:** an icon grid, following the `WhyChooseUs` trust-point pattern.
7. **`ServiceFaq`:** a FAQ built on `components/ui/accordion`. No FAQPage JSON-LD while the answers are lorem.
8. **`AreasServed`:** a chip grid with a count. Chips are not links until Phase 4.
9. **`EnquirySection`** with the service preselected, then **`CtaBand`**.

## Step 4: Routes, SEO, sitemap

- **`app/(site)/services/[slug]/page.tsx`:**
  - `generateStaticParams()` returns the 3 slugs from `SERVICE_CATEGORIES`.
  - `params` is a Promise.
  - An unknown slug calls `notFound()`. `dynamicParams` isn't available under Cache Components, so the check happens in the page.
  - `generateMetadata` sets the title, description, canonical `/services/{slug}` and the OG image (the category image).
  - Adds `Service` JSON-LD (name, provider, `areaServed` from `content/areas.ts`) through `serializeJsonLd`. `Breadcrumbs` already emits BreadcrumbList.
- **`app/(site)/services/page.tsx`:** the index page. It has a `PageHero` (Home › Services), `ServiceCategoryGrid`, `WhyChooseUs`-style benefits, then `CtaBand`.
- **`app/sitemap.ts`:** add `/services` and the 3 category URLs.
- The mega-menu's "All services" link and the footer service links now resolve.

## Critical files

- **New:**
  - `app/(site)/services/page.tsx` and `app/(site)/services/[slug]/page.tsx`
  - `sections/services/*.tsx`
  - `content/services/*`, replacing `content/services.ts`
  - `content/areas.ts`
  - `lib/format.ts`
  - `lib/icons.ts` (one icon registry; `ServiceIcon` becomes a generic `Icon`)
  - `docs/CONTENT-GUIDE.md`
  - `components/shared/{ServiceCategoryGrid,EnquirySection,EnquiryForm}.tsx` (the last two moved)
- **Modified:**
  - `types/content.ts`
  - `content/site.ts`
  - `components/shared/PageHero.tsx`
  - `lib/contact.ts`
  - `lib/seo.ts` (`getServiceJsonLd`)
  - `app/sitemap.ts`
  - `app/(site)/page.tsx` and `sections/home/ServicesOverview.tsx`, to use the moved components
  - `docs/plans/README.md`
- **Reused:**
  - `PageHero`, `Breadcrumbs`, `SectionHeading`, `Reveal`, `ContactActions`, `CtaBand`, `ServiceIcon`
  - `getWhatsAppUrl`, `serializeJsonLd`, `absoluteUrl`
  - the accordion primitive
  - `PLACEHOLDER_IMAGES`

## Verification

1. Run `yarn check` and `yarn build`. `/services` and the 3 category pages must be prerendered as static or SSG.
2. Check `/services/unknown`: it must return 404.
3. Run the CDP screenshot script on `/services` and `/services/pest-control`:
   - at 360px and 1440px
   - in light and dark mode
   - with reduced motion on
   - checking for no overflow and no CSP errors
4. Scripted checks:
   - **Book now:** opens a `wa.me` URL that names the right sub-service.
   - **Enquiry form:** preselects the category.
   - **FAQ accordion:** opens and closes with the keyboard.
   - **Plans:** the table shows at 1440px and the cards at 360px.
   - **SEO:** one `h1`, the canonical URL, and both the Service and BreadcrumbList JSON-LD are present.
   - **Sitemap:** lists the 4 new URLs.
   - **Replaceability test (temporary, not committed):**
     - Delete a category's `plans` and `faqs`: those sections disappear with no errors.
     - Add a 4th dummy category file: it appears in the nav, footer, home cards, `/services`, the form options, the sitemap, and its own route.
     - Revert afterwards.
5. Finish:
   - Fill in the plan's **Outcome**, set it to `Done` and update the roadmap.
   - Ask before committing.
   - Write a descriptive single commit, so the PR auto-fills from it.

## Outcome

### Delivered

- **Routes**, all prerendered as static pages:
  - `/services`: the index, with hero, category cards and enquiry form
  - `/services/[slug]`: one page per category via `generateStaticParams`
  - The nav, mega-menu, footer and home links to these pages no longer 404.
- **Template** (`sections/services/ServiceCategoryPage.tsx`) renders these sections, in order:
  1. `PageHero` with breadcrumbs and WhatsApp/call actions
  2. `ServiceIntro`
  3. `SubServiceGrid` (WhatsApp "Book now" naming the sub-service and category)
  4. `ServiceContentBlocks`
  5. `PlansComparison` (a semantic table from `lg` up, stacked cards below)
  6. `ServiceBenefits`
  7. `ServiceFaq` (accordion)
  8. `AreasServed`
  9. `EnquirySection` with the service preselected
  10. `CtaBand`, whose quote button targets the page's own `#contact`
- **Every section is optional.** It renders only when its data exists, and backgrounds alternate over whatever is present.
- **Content is replaceable:**
  - `content/services/` holds one file per category plus `index.ts`. It is the single source for the nav, footer, cards, form options and Zod enum, the routes, the sitemap and JSON-LD.
  - Every page field on `ServiceCategory` is optional.
  - Icons come from one registry (`lib/icons.ts` and `components/shared/Icon`). This replaced the `ServiceIconName`, `TrustPointIcon`, `ClientLogoIcon` and `CertificationIcon` unions and the per-component icon maps.
  - Prices are plain numbers formatted by `formatPrice()` with `SITE_CONFIG.currency` (USD).
  - `content/areas.ts` may be empty.
  - Page headings live in `content/service-page.ts`.
- **Shared components:**
  - `ServiceCategoryGrid` adapts to any number of categories.
  - `EnquirySection` and `EnquiryForm` moved to `components/shared/` and gained `defaultService`. Their copy moved to `content/contact.ts`.
  - `PageHero` gained an `actions` slot.
  - `ContactActions` and `CtaBand` gained `quoteHref`.
- **SEO:**
  - per-page title, description, canonical URL and OG image
  - `getServiceJsonLd()` (Service with provider, `areaServed` and an offer catalogue without prices)
  - BreadcrumbList via `Breadcrumbs`
  - the sitemap now derives from the categories
- **Docs:** `docs/CONTENT-GUIDE.md`, linked from the README and AGENTS.md.
- **Verified:**
  - `yarn check` and `yarn build` pass.
  - In dev mode, `/`, `/services` and all 3 category pages show no console errors or warnings, and a client navigation from `/services` into a category renders cleanly.
  - Screenshots at 360px and 1440px. No horizontal overflow and no CSP errors.
  - Scripted checks:
    - one `h1`, the canonical URL, and the Service and BreadcrumbList JSON-LD are present
    - 8 "Book now" links pre-fill the right sub-service
    - the form preselects the category
    - the FAQ opens one item at a time
    - the table shows on desktop and the cards on mobile
    - 32 area chips render
    - the CTA band's quote link points to `#contact`
  - The replaceability test passed and was reverted:
    - Removing a category's plans and FAQs hides those sections.
    - Adding a 4th category with only the required fields gives it a page, a sitemap entry, footer and card links, a mega-menu entry and a form option, with no code changes.

### Changes from the plan

- **Content location.** The category content went straight into `content/services/` rather than a separate `service-details/` folder, so each category is one file.
- **Index page.** `/services` got the enquiry form instead of the `WhyChooseUs`-style benefits, which live on each category page.
- **Duplicate React keys.** Paragraphs were keyed by their first 40 characters, which collided when two placeholder paragraphs shared a prefix. A dev-mode console error caught it. Static paragraph lists now render through `components/shared/Paragraphs.tsx`, keyed by position.
- **Instant-navigation validation.** Cache Components flagged `params` being read outside `<Suspense>`, which can block a client navigation. The page now reads `params` inside `<Suspense>`, with a `ServicePageSkeleton` fallback. Known slugs are still fully prerendered.
- **Intro image** uses `loading="eager"`, because dev mode flagged it as the LCP element on some pages.
- **Security header.** `browsing-topics` was removed from `Permissions-Policy`, because Chrome now warns that it is an unrecognised feature.

### Still open

- **Unknown slugs return status 200, not 404.**
  - `/services/<unknown>` shows the not-found page and Next adds `noindex`, but the HTTP status is 200.
  - This is documented Next behaviour under Partial Prerendering: the shell streams before `notFound()` runs.
  - A true 404 would need a slug check in `proxy.ts`. Revisit in Phase 4, when area routes add more dynamic segments.
- **Sub-service cards** get "Learn more" links once the Phase 4 pages exist.
- **Area chips** become links to area pages in Phase 4.
