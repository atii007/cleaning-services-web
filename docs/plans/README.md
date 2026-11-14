# Plans & roadmap

Every plan we agree to execute is saved here **before** work starts and updated when it finishes. This folder is the record of what each phase delivered.

## How it works

1. Each phase or larger task gets its own file: `phase-NN-short-name.md`.
2. Each file has:
   - a **Status** line
   - the approved **Plan**
   - an **Outcome** section, filled in at the end with what was actually delivered and any changes from the plan
3. When a phase starts or finishes, update the roadmap table below in the same commit.

Status values: `Planned` · `In progress` · `Done` · `Dropped`

## Roadmap

| Phase | Scope                                                                                                                                                                    | Status  | Plan                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | -------------------------------------------------------------------- |
| 0     | Project setup: tooling, theme, layout shell, CI                                                                                                                          | Done    | [phase-00-project-setup.md](phase-00-project-setup.md)               |
| 1     | Design system and global layout: top bar, sticky header with dropdowns, mobile drawer, breadcrumbs, full footer (certifications, policies), WhatsApp button, promo popup | Done    | [phase-01-design-system-layout.md](phase-01-design-system-layout.md) |
| 2     | Home page: hero slider, service cards, before/after gallery, testimonials, client logos, contact section, latest blog posts                                              | Planned | —                                                                    |
| 3     | Service category template (cleaning, pest control, maid services): hero, sub-service grid, content blocks, comparison table, benefits, FAQ, served areas                 | Planned | —                                                                    |
| 4     | Sub-service and area pages: dynamic routes and `generateStaticParams` (around 40 areas)                                                                                  | Planned | —                                                                    |
| 5     | About, Blog (list and detail), Contact, policy pages                                                                                                                     | Planned | —                                                                    |
| 6     | Contact/quote form backend (server action, Zod, email, spam protection) and chat assistant widget                                                                        | Planned | —                                                                    |
| 7     | SEO and performance pass: per-page JSON-LD, OG images, Lighthouse, accessibility, analytics, optional Arabic/RTL                                                         | Planned | —                                                                    |
