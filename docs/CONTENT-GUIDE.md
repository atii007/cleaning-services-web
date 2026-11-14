# Content guide

All text, prices, services, areas and images live in `content/`. Everything on the site is placeholder until the real data is ready. Replacing it is a matter of editing these files, with no component or route changes.

After any change, run `yarn check && yarn build`. TypeScript flags a missing required field or an icon name that doesn't exist.

## Where things live

| What                                                     | File                                               |
| -------------------------------------------------------- | -------------------------------------------------- |
| Business name, phones, WhatsApp, address, hours, socials | `content/site.ts`                                  |
| Currency                                                 | `content/site.ts` → `currency`                     |
| Main nav and footer links                                | `content/site.ts`                                  |
| Certifications (footer)                                  | `content/site.ts`                                  |
| Services, one file per category                          | `content/services/<slug>.ts`                       |
| Service order (and which services exist)                 | `content/services/index.ts`                        |
| Areas served                                             | `content/areas.ts`                                 |
| Home page copy, stats and trust points                   | `content/home.ts`                                  |
| Before/after gallery                                     | `content/gallery.ts`                               |
| Testimonials, client logos, blog posts                   | `content/testimonials.ts`, `clients.ts`, `blog.ts` |
| Contact form and contact panel copy                      | `content/contact.ts`                               |
| Service page headings ("Our … services", FAQ, plans…)    | `content/service-page.ts`                          |
| Promo popup                                              | `content/promo.ts`                                 |
| Images                                                   | `content/images.ts`                                |

## Services

Each service category is a single file in `content/services/`, typed `ServiceCategory` (see `types/content.ts`). The list in `content/services/index.ts` is the only place that decides which services exist and in what order.

Everything else derives from that list:

- the nav, mega-menu and mobile menu
- the footer
- the home and `/services` cards
- the enquiry form's service dropdown
- the page routes
- the sitemap and structured data

### Add a service

1. Copy an existing file, e.g. `content/services/pest-control.ts` to `content/services/window-cleaning.ts`.
2. Change `slug`. It becomes the URL `/services/<slug>`. Use lowercase with hyphens.
3. Rename the export, e.g. `WINDOW_CLEANING`, and add it to the array in `content/services/index.ts`.

### Remove a service

Delete the file, then delete it from the array in `index.ts`.

### Required and optional fields

The required fields are `slug`, `title`, `tagline`, `summary`, `icon` and `image`. A category with only these renders a page with a hero, an enquiry form and areas.

Every page section is optional and appears only when its data is present:

| Field                    | Section                                       | Notes                                                                                                                      |
| ------------------------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `hero`                   | Banner text                                   | Without it, the banner uses `tagline` and `summary`.                                                                       |
| `intro`                  | Intro with checklist and image                | The image is optional.                                                                                                     |
| `subServices`            | Sub-service cards with "Book now" on WhatsApp | Any count. `priceFrom` is optional.                                                                                        |
| `blocks`                 | Alternating image and text rows               | Any count. The image is optional.                                                                                          |
| `plans` + `planFeatures` | Plans comparison                              | Any number of plans. Each feature row's `values` has one entry per plan, in the same order: `true`, `false` or short text. |
| `benefits`               | Benefits grid                                 |                                                                                                                            |
| `faqs`                   | FAQ accordion                                 |                                                                                                                            |
| `metaDescription`        | Search result description                     | Falls back to `summary`.                                                                                                   |

Section backgrounds alternate automatically over whatever sections are present.

### Sub-service pages

A sub-service gets its own page at `/services/<service>/<sub-service>` only if it has a `detail` block. Without one, its card just books on WhatsApp.

```ts
{
  slug: 'bed-bug-treatment',
  title: 'Bed Bug Treatment',
  summary: '…',
  icon: 'bed',
  priceFrom: 75,
  detail: {
    description: ['First paragraph…', 'Second paragraph…'],
    included: ['Inspection', 'Treatment', 'Follow-up visit'], // optional checklist
    image: PLACEHOLDER_IMAGES.bedroom, // optional
    faqs: [{ question: '…', answer: '…' }], // optional; falls back to the category's FAQs
  },
}
```

When a sub-service has a page:

- its card shows a "Learn more" link
- the page joins the sitemap
- the page is linked from its sibling sub-services

Remove `detail` to take the page down.

The sub-service slug `areas` is reserved for area pages, and the build fails with a clear message if one uses it.

## Prices and currency

Prices are plain numbers, such as `priceFrom: 45` or `price: 150`. They are formatted with the currency in `content/site.ts`:

```ts
currency: { code: 'USD', locale: 'en-US' } // e.g. { code: 'PKR', locale: 'en-PK' } or { code: 'AED', locale: 'en-AE' }
```

## Icons

Icon fields take a name from `lib/icons.ts`, for example `'bug'`, `'sofa'` or `'calendar'`. Need a different icon? Pick one at https://lucide.dev, then add a line to `ICONS` in `lib/icons.ts`, for example `broom: BroomIcon`.

## Areas

`content/areas.ts` is a plain list of area names, of any length. Every service gets a page per area at `/services/<service>/areas/<area-slug>`, for example "Pest Control in Al Bateen". The slug comes from the name, so `Al Reem Island` becomes `al-reem-island`.

- **Adding or removing a name** adds or removes those pages, their links on service pages, and their sitemap entries.
- **An empty list (`[]`)** hides every areas section and creates no area pages.
- **Area page text** comes from the templates in `content/service-page.ts` (`area.*`), with the service and area names filled in. Everything else on the page comes from the service's own content: sub-services, plans, benefits and FAQs.

Renaming an area changes its URL. Once the site is live, add a redirect in `next.config.ts` for the old URL.

## Images

`content/images.ts` holds every photo. Each one has `src`, `alt`, `width` and `height`.

- **Remote images:** if they come from a host other than Unsplash, add that host to `images.remotePatterns` and to the CSP `img-src` in `next.config.ts`.
- **Local images:** put the files in `public/` and use a path such as `/images/team.jpg`.
- **Before/after pairs:** in `content/gallery.ts`, replace the `unsplashBeforeAfter(...)` call with explicit `before` and `after` images.
