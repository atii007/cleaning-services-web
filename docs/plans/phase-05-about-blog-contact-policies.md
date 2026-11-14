# Phase 5: About, Blog, Contact and policy pages

**Status:** Done (2026-11-15). Branch: `feat/phase-05-about-blog-contact-policies`.

## Context

Phases 0–4 delivered the layout, the home page and all service pages. The header, footer and home page already link to `/about`, `/blog`, `/blog/<slug>`, `/contact`, `/privacy-policy`, `/refund-policy` and `/terms`, and **all of these return 404 today**. Phase 5 builds those pages. The same rules apply: everything comes from typed content, every section is optional, and nothing is hard-coded to a particular service.

**Decisions (confirmed in chat)**

- **Blog bodies** are typed block arrays in `content/blog.ts`. There is no MDX and no new dependency.
- **Policy URLs** stay at the top level (`/privacy-policy`, `/refund-policy`, `/terms`). One generated route serves them from `content/policies.ts`, and the footer's legal links come from that file.
- **Contact page:** the enquiry section, an embedded map and contact FAQs. The global "Get a free quote" link changes from `/#contact` to `/contact`.
- **Real 404s:** `dynamicParams` is removed under Cache Components (see `node_modules/next/dist/docs/.../dynamicParams.md`), so `proxy.ts` is extended to cover `/blog/*` and single-segment top-level paths, as in Phase 4.

## Plan

### 1. Content and types (`types/content.ts`, `content/`)

**Blog (`content/blog.ts`)**

- `BlogBlock` is a union of:
  - `{ type: 'heading', text }` (rendered as h2)
  - `{ type: 'paragraph', text }`
  - `{ type: 'list', items, ordered? }`
  - `{ type: 'image', image, caption? }`
  - `{ type: 'quote', text, cite? }`
  - `{ type: 'callout', title?, text }`
- `BlogPost` gains:
  - `body: BlogBlock[]`
  - `author?: { name, role? }`
  - `updatedAt?`
  - `tags?`
  - `relatedServices?`: category slugs that drive a "Related services" strip
- Give each of the 6 dummy posts realistic placeholder text of 5–8 blocks.
- New helpers:
  - `getPostBySlug`
  - `getBlogCategories()`, derived from posts
  - `getRelatedPosts(post, n)`: same category first, then newest
  - `getAllBlogPaths()`
- The `DATE_FORMAT` in `LatestPosts` moves to `lib/format.ts` as `formatDate`, so both pages share it.

**`content/blog-page.ts`**

- Copy for the blog index (hero and filter labels, including "All").
- Copy for the article page ("Related posts", "Share", "Back to blog" and similar).

**`content/about.ts`**

- hero
- story (paragraphs and an image)
- mission and vision cards
- values (`Benefit[]`)
- a timeline/milestones list (optional)
- team members (optional: name, role, image)

It reuses `STATS`, `TRUST_POINTS`, `SITE_CONFIG.certifications`, testimonials and client logos instead of copying them.

**`content/policies.ts`**

- A `Policy` has `slug`, `title`, `metaDescription`, `updatedAt`, and `sections: { heading, paragraphs, bullets? }[]`.
- There are 3 dummy policies.
- Helpers: `getPolicyBySlug`, `getPolicyHref`, `POLICY_NAV_ITEMS`.
- `SITE_CONFIG.footerNav.legal` is set from `POLICY_NAV_ITEMS`.
- A build-time guard rejects any policy slug that clashes with a static top-level route, using the same pattern as the reserved `areas` guard.

**`content/contact.ts`**

- Adds `CONTACT_PAGE`: hero copy, FAQs (`Faq[]`), and a map block `{ title, embedUrl, linkUrl }`.
- The map is optional. Without it, no iframe is rendered.

**`content/site.ts`**

- `ctas.quote.href` changes to `/contact`.
- The in-page `quoteHref="#contact"` on inner pages stays as it is.

### 2. Routes (thin, in `app/(site)/`)

| Route          | File                   | Notes                                                                                              |
| -------------- | ---------------------- | -------------------------------------------------------------------------------------------------- |
| `/about`       | `about/page.tsx`       | static metadata and composes `sections/about/*`                                                    |
| `/blog`        | `blog/page.tsx`        | hero and `BlogIndex`                                                                               |
| `/blog/[slug]` | `blog/[slug]/page.tsx` | `generateStaticParams`, params read inside `<Suspense>`, `EMPTY_PARAM` sentinel, skeleton fallback |
| `/contact`     | `contact/page.tsx`     | hero, `EnquirySection`, map, FAQ, CTA band                                                         |
| `/<policy>`    | `[policy]/page.tsx`    | `generateStaticParams` from policies; same Suspense and sentinel pattern                           |

Every route gets:

- a title
- a description
- a canonical URL
- OpenGraph data (`type: 'article'` plus `publishedTime` for posts)

### 3. Sections and components

**`sections/about/`**

- `AboutStory`
- `MissionVision`
- `AboutValues`
- `Milestones`
- `TeamGrid`

The page also reuses existing sections:

- `WhyChooseUs` stats or `CountUp`
- a certifications grid (extract the footer's certification list into `components/shared/CertificationList` if both places use it)
- `Testimonials`
- `ClientLogos`
- `CtaBand`

**`sections/blog/`**

- **`BlogIndex`** (server), with **`BlogCategoryFilter`** as a small `'use client'` leaf:
  - category chips with `aria-pressed`, following the `GalleryGrid` filter pattern
  - filtering happens client-side
  - all posts stay in the HTML, which helps SEO
- **`BlogPostCard`** is extracted from `LatestPosts`, which then reuses it.
- **`BlogArticle`**:
  - `PageHero` with breadcrumbs (Home › Blog › title), plus meta (date, read time, category, author)
  - `BlogBody` renders the blocks and uses `Paragraphs`/stable keys
  - a related-services strip from `relatedServices` via `ServiceCategoryGrid`
  - related posts
  - `CtaBand`
- **`BlogPostSkeleton`** is the Suspense fallback. It never returns null.
- **Prose styling:** a small `.prose-content` utility in `globals.css` that uses tokens only. No typography plugin is added.

**`sections/contact/`**

- **`ContactMap`**: a lazy `iframe` (`loading="lazy"`, `title`, `referrerPolicy`), wrapped in a rounded card with an "Open in Google Maps" link.
- **FAQ:** reuse `ServiceFaq` after giving it optional `title`/`eyebrow` props, so its copy isn't fixed to the service page. Its current callers stay unchanged.

**`sections/legal/PolicyPage`**

- `PageHero` with the title and an "Updated on …" line.
- An optional table of contents with anchor links.
- Sections rendered with `.prose-content`.

### 4. SEO, 404 and security

- **`lib/seo.ts`:** add `getArticleJsonLd(post)`. Blog posts also get breadcrumb JSON-LD, and the contact page gets the `LocalBusiness` schema already in the layout.
- **`app/sitemap.ts`:** add `/about`, `/blog`, `/contact`, every blog path and every policy path (posts use `lastModified` from their dates).
- **`proxy.ts`:**
  - Add `/blog/:path*` to the matcher.
  - Add a single-segment matcher, `'/:segment((?!_next)[^/.]+)'`.
  - The valid set is the service paths, the blog paths, the policy paths and a `STATIC_TOP_LEVEL_ROUTES` constant (`/`, `/about`, `/blog`, `/contact`, `/services`, `/styleguide`).
  - Anything else is rewritten to `/_not-found`.
- **`next.config.ts` CSP:** add `frame-src https://www.google.com` (the map embed) and nothing else.

### 5. Docs

`docs/CONTENT-GUIDE.md` gets sections on:

- blog posts and the block types
- the About page
- policies and the reserved slugs
- the contact map and FAQs

## Critical files

- `content/blog.ts`, `content/about.ts` (new), `content/policies.ts` (new), `content/contact.ts`, `content/site.ts`, `types/content.ts`
- `app/(site)/{about,blog,blog/[slug],contact,[policy]}/page.tsx`
- `sections/{about,blog,contact,legal}/*`, `sections/home/LatestPosts.tsx`, `sections/services/ServiceFaq.tsx`
- `proxy.ts`, `app/sitemap.ts`, `lib/seo.ts`, `lib/format.ts`, `next.config.ts`, `app/globals.css`

## Verification

1. Run `yarn check` and `yarn build`. All new pages must be prerendered (○/● in the build output).
2. **Status codes (prod server):**
   - 200 for `/about`, `/blog`, every post, `/contact` and the 3 policies
   - 404 for `/blog/x`, `/x`, `/privacy-policy/x`
   - all Phase 4 service 404s still hold
   - `/robots.txt`, `/sitemap.xml` and `/favicon.ico` are unaffected
3. **CDP screenshots at 360px and 1440px:** About, the blog index, a post, Contact (the map loads with no CSP errors) and a policy page. No horizontal overflow, and both light and dark themes work.
4. **Scripted checks:**
   - Each page has one h1.
   - The category filter's `aria-pressed` updates when a chip is clicked.
   - The footer's legal links come from content.
   - The header's "Get a free quote" goes to `/contact`.
   - Article and breadcrumb JSON-LD and canonical URLs are present.
   - The sitemap has the expected number of URLs.
5. **Dev mode** (reuse the `:3000` server if it is running): the console is clean on every new page, and on client navigations to Blog → post → Contact and Footer → policy.
6. **Replaceability test (reverted afterwards):**
   - With an empty `BLOG_POSTS`, the build passes, the blog index shows an empty state and the home page's latest-posts section is hidden.
   - With an empty policies list, the build passes and the footer's legal column is hidden.
   - With no map, the build passes and there is no iframe.

## Outcome

### Delivered

- **About** (`/about`): story, mission and vision, values, animated stats, milestone timeline, team (initials when there is no photo), certifications, testimonials and client logos. Every section is optional, and backgrounds alternate over whichever sections are present (`SectionStack`).
- **Blog index** (`/blog`): every post, newest first, with category chips (`aria-pressed`) that filter client-side. All posts are in the server HTML, and there is an empty state when there are no posts.
- **Blog posts** (`/blog/[slug]`): 6 pages built from typed body blocks (heading, paragraph, list, image, quote, callout). Each has:
  - a hero with date, read time and author
  - tags and "Back to all posts"
  - related services and related posts
  - the CTA band
  - `BlogPosting` and breadcrumb structured data, plus OpenGraph `article` metadata
- **Contact** (`/contact`): a hero with WhatsApp and call buttons, the enquiry section, a lazy Google Maps embed with "Open in Google Maps", contact FAQs and the CTA band. The global "Get a free quote" link and the promo popup's CTA now go to `/contact`.
- **Policies** (`/privacy-policy`, `/refund-policy`, `/terms`): one generated `[policy]` route from `content/policies.ts`, with a sticky numbered table of contents and anchored sections. The footer's legal links come from the same list. A build-time guard rejects slugs that clash with top-level pages.
- **Real 404s:** `proxy.ts` now also covers `/blog/*` and single top-level segments. The valid set is the service, blog and policy paths plus `STATIC_TOP_LEVEL_SEGMENTS` (`constants/routes.ts`). Verified:
  - 404 for `/blog/x`, `/x`, `/_foo`, `/__none__`, `/privacy-policy/x` and `/about/x`
  - all Phase 4 service 404s still hold
  - files (`/robots.txt`, `/sitemap.xml`, `/favicon.ico`, `/manifest.webmanifest`) and Next dev endpoints (`__nextjs_*`) are untouched
- **Sitemap:** 121 URLs (`/about`, `/contact`, `/blog`, the posts with `lastModified`, and the policies).
- **CSP:** `frame-src https://www.google.com` only.
- **Shared building blocks:**
  - `BlogPostCard` (also used by the home page's `LatestPosts`, which now hides itself when there are no posts)
  - `CertificationList` (footer and About)
  - `ArticleSkeleton`
  - `formatDate` and `getInitials` in `lib/format.ts`
  - optional `heading` on `ServiceFaq` and `ServiceBenefits`
  - optional `services` on `ServiceCategoryGrid`
  - `className` on `Testimonials` and `ClientLogos`
- **Docs:** `docs/CONTENT-GUIDE.md` covers the blog block types, the About page, the contact map and FAQs, and policies with their reserved slugs.
- **Verified:**
  - `yarn check` and `yarn build` pass, and every new page is prerendered.
  - Each page has one h1, a canonical URL and the expected structured data.
  - Headless Chrome at 360px and 1440px: no horizontal overflow, no console or CSP errors, and the map iframe loads.
  - The blog filter goes from 6 posts to 2 for "News".
  - Dev mode (`:3000`): a clean console on every new page and on client navigations Home → Blog → post → Contact → Terms (footer) → About → Privacy (footer).
  - Empty-content test (reverted): with no posts, no policies and no map, the build passes, the sections and links disappear, the old URLs return 404 and the sitemap drops to 111 URLs.

### Changes from the plan

- **No `.prose-content` utility.** `BlogBody` and `PolicyPage` style their own elements with token classes, so no global CSS was added.
- **No repeated cover image on articles.** The cover is shown only in the hero, because repeating it below triggered Next's LCP `loading` warning in dev (the same issue as in Phase 4).
- **The blog index hero** uses a photo that no post uses, for the same reason.
- **The About story** reuses `ServiceIntro`, and the values section reuses `ServiceBenefits` with the new `heading` prop, instead of new components.
- **The promo popup's CTA** also moved from `/#contact` to `/contact`.

### Still open

- **Policy wording** is placeholder and needs legal review before launch.
- **The map** points to a placeholder location. Swap `CONTACT_MAP` for the real office once known.
- **Adding a top-level page folder** also means adding its segment to `constants/routes.ts`, or the proxy returns 404 for it.
- **Dark mode** was not checked visually this phase. The site defaults to the light theme, and all new UI uses theme tokens.
- **Blog pagination** isn't needed with 6 posts. Add it once the post count grows.
