# Code best practices

ESLint and Prettier enforce most of these automatically. The rest are conventions.

## TypeScript

- `strict` with `noUncheckedIndexedAccess`. Indexed access returns `T | undefined`, so handle that case.
- No `any`, no `@ts-ignore` or `@ts-expect-error`, and no non-null assertions (`!`).
- Use `import type` for type-only imports.
- Use `as const satisfies T` for content and config objects. You get literal types and checking against the shape.

## Style

- Always use braces (`curly`). Prefer early returns over `else` after a `return`.
- Use `const` over `let`, and never `var`. Don't mutate; prefer array methods over loops.
- Use `===` (`eqeqeq`). No `console.log`. `console.info`, `console.warn` and `console.error` are allowed.
- Call hooks as `React.useState`, `React.useEffect` and so on, through `import * as React from 'react'`. Named hook imports are blocked by lint.
- Component files and components use PascalCase (`ThemeSwitcher.tsx`). shadcn files in `components/ui` stay kebab-case.
- Write components as arrow functions with named exports. Route files (`page.tsx`, `layout.tsx`) use `export default function`.
- Constants use `SCREAMING_SNAKE_CASE`. Zod schemas end in `Schema`.

## Imports

`simple-import-sort` orders imports in this sequence:

1. External packages (`react`, `next`, then others)
2. `@/…` aliases
3. Relative imports
4. Side-effect imports (`./globals.css`)

## Styling

- Use Tailwind utilities with theme tokens only (see `ALWAYS-APPLY-RULES.md`).
- Use `cn()` (from `cn`, re-exported at `@/lib/utils`) for conditional classes.
- Prettier sorts classes, so don't hand-order them.
- Build component variants with `class-variance-authority`.

## Folder map

| Folder                  | Holds                                                                      |
| ----------------------- | -------------------------------------------------------------------------- |
| `app/`                  | Routes, layouts and metadata files (`sitemap.ts`, `robots.ts`). Kept thin. |
| `sections/<page>/`      | Page-level sections, e.g. `sections/home/HomeHero.tsx`                     |
| `components/ui/`        | shadcn primitives (generated, kebab-case)                                  |
| `components/shared/`    | Reusable building blocks (Logo, ThemeSwitcher, SocialIcon…)                |
| `components/layout/`    | TopBar, Header, MainNav, MobileNav, Footer                                 |
| `components/providers/` | Client context providers                                                   |
| `content/`              | Typed placeholder content and site config                                  |
| `lib/`                  | `env`, `seo`, `mail`, `rate-limit` and `utils` helpers                     |
| `actions/`              | Server Actions (`'use server'`), e.g. `actions/enquiry.ts`                 |
| `schemas/`              | Zod schemas (forms, server actions)                                        |
| `types/`                | Shared TypeScript types                                                    |
| `hooks/`                | Reusable client hooks                                                      |
| `constants/`            | Non-content constants                                                      |
| `scripts/security/`     | Malware scanner used by Husky and PR checks                                |
