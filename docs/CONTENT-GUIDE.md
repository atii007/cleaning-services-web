# Content guide

All text, prices, services, areas and images live in `content/`. Everything on the site is placeholder until the real data is ready. Replacing it is a matter of editing these files, with no component or route changes.

After any change, run `yarn check && yarn build`. TypeScript flags a missing required field or an icon name that doesn't exist.

## Where things live

| What                                                     | File                                               |
| -------------------------------------------------------- | -------------------------------------------------- |
| Business name, phones, WhatsApp, address, hours, socials | `content/site.ts`                                  |
| Currency                                                 | `content/site.ts` → `currency`                     |
| Main nav and footer links                                | `content/site.ts`                                  |
| Certifications (footer and About page)                   | `content/site.ts`                                  |
| Services, one file per category                          | `content/services/<slug>.ts`                       |
| Service order (and which services exist)                 | `content/services/index.ts`                        |
| Areas served                                             | `content/areas.ts`                                 |
| Home page copy, stats and trust points                   | `content/home.ts`                                  |
| Before/after gallery                                     | `content/gallery.ts`                               |
| Testimonials, client logos, blog posts                   | `content/testimonials.ts`, `clients.ts`, `blog.ts` |
| Contact form, contact panel, /contact page, map and FAQs | `content/contact.ts`                               |
| About page                                               | `content/about.ts`                                 |
| Blog index and article page copy                         | `content/blog-page.ts`                             |
| Policy pages (privacy, refund, terms…)                   | `content/policies.ts`                              |
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

## Blog

Posts live in `content/blog.ts` as `BLOG_POSTS`. Order does not matter: lists are always sorted newest first by `publishedAt` (an ISO date such as `2026-10-28`). Each post gets a page at `/blog/<slug>`, a card on `/blog`, and a sitemap entry. The newest three also appear on the home page.

- **Required:** `slug`, `title`, `excerpt`, `publishedAt`, `readMinutes`, `category`, `image` and `body`.
- **Optional:** `updatedAt`, `author` (`{ name, role? }`), `tags`, and `relatedServices` (service slugs shown as cards under the article; unknown slugs are ignored).
- **Categories** come from the posts themselves. The filter chips on `/blog` appear once there are at least two.
- **The body** is a list of blocks, rendered in order:

| Block       | Fields                                   |
| ----------- | ---------------------------------------- |
| `heading`   | `text` (a section heading)               |
| `paragraph` | `text`                                   |
| `list`      | `items`, `ordered?` (numbered when true) |
| `image`     | `image`, `caption?`                      |
| `quote`     | `text`, `cite?`                          |
| `callout`   | `text`, `title?` (a highlighted tip box) |

With no posts at all, `/blog` shows an empty message and the home page hides its blog section.

## About page

`content/about.ts` holds the story, mission and vision, values, milestones and team. Every section is optional: an empty list (or empty story paragraphs) removes that section. Team members without an `image` show their initials. The stats, certifications, testimonials and client logos are reused from `content/home.ts`, `content/site.ts`, `content/testimonials.ts` and `content/clients.ts`.

## Contact page

`/contact` shows the enquiry form and contact panel, then the map and FAQs from `content/contact.ts`.

- **Map:** `CONTACT_MAP` takes a Google Maps `embedUrl` and a normal `linkUrl`. Set it to `undefined` to hide the map. An embed from another host also needs that host in the CSP `frame-src` in `next.config.ts`.
- **FAQs:** `CONTACT_FAQS`. An empty list hides the section.

## Policies

`content/policies.ts` lists the legal pages. Each one is served at the top level, `/<slug>` (for example `/privacy-policy`), and the footer's legal links are built from the same list, so adding or removing a policy needs no other change. Each policy has a `title`, `metaDescription`, `updatedAt`, an optional `intro`, an optional short `navLabel` for the footer, and `sections` of `{ heading, paragraphs, bullets? }`. A table of contents appears when there is more than one section.

**Reserved slugs:** a policy slug cannot be `about`, `blog`, `contact`, `services` or `styleguide`. The build fails with a clear message if it is. These names come from `constants/routes.ts`, which must also be updated whenever a new top-level page folder is added, or the 404 proxy will block it.

Placeholder wording is not legal advice. Have the final text reviewed before launch.

## Images

`content/images.ts` holds every photo. Each one has `src`, `alt`, `width` and `height`.

- **Remote images:** if they come from a host other than Unsplash, add that host to `images.remotePatterns` and to the CSP `img-src` in `next.config.ts`.
- **Local images:** put the files in `public/` and use a path such as `/images/team.jpg`.
- **Before/after pairs:** in `content/gallery.ts`, replace the `unsplashBeforeAfter(...)` call with explicit `before` and `after` images.
