# Phase 0: Project setup

**Status:** Done (2026-11-14). The initial commit is `c3a97ab` on `main`.

## Context

This is a new production-grade marketing site for a cleaning-services business. Its page structure is modelled on ppjsolutions.com:

- service category pages, sub-service pages and area pages
- a blog
- policy pages
- a contact form

All content is placeholder until the design is final. Phase 0 covers project setup only.

Tooling conventions come from the HRMS project, upgraded to the latest library versions:

- Husky, Prettier and ESLint rules
- token-based Tailwind theming with next-themes
- folder layout
- coding rules

**Decisions:** Yarn 4, deploy on Vercel, project name `cleaning-services-web`. The user creates the GitHub repo and provides its URL for the push.

## Plan (as approved)

**Stack**

- Next.js 16 with the App Router, and React 19
- TypeScript (`strict` plus `noUncheckedIndexedAccess`)
- Tailwind CSS 4, configured in CSS through `@theme`
- shadcn (Radix), lucide-react
- next-themes, using the HRMS ThemeProvider and ThemeSwitcher pattern
- react-hook-form and Zod 4
- motion, sonner, `next/font`
- Left out until needed: TanStack Query, Zustand, auth and a database

**Tooling**

- Prettier: the HRMS config plus `prettier-plugin-tailwindcss`.
- ESLint flat config built on `eslint-config-next`. It ports the HRMS rules and adds `simple-import-sort`.
- Husky hooks:
  - `pre-commit`: malware scan, then lint-staged, then type-check
  - `commit-msg`: commitlint
  - `pre-push`: malware scan
- The HRMS malware scanner, copied to `scripts/security/`.

**Theme:** the HRMS model of brand palette, then semantic tokens, then a `.dark` override, ported to Tailwind v4 (`@theme inline`, `@custom-variant dark`). Rule: theme tokens only.

**Security and production**

- Security headers (CSP, HSTS, `X-Frame-Options`, and others)
- `poweredByHeader: false`
- Zod-validated env in `lib/env.ts`
- Metadata, `sitemap`, `robots`, `manifest`, LocalBusiness JSON-LD
- `not-found` and `error` pages

**Structure**

- `app/` holds thin routes only.
- Page sections go in `sections/<page>/`. Components go in `components/{ui,shared,layout}`.
- Typed placeholder content lives in `content/`.
- Helpers and types in `lib/`, `types/`, `schemas/`, `hooks/` and `constants/`.

**Repo:**

- `CLAUDE.md` and `AGENTS.md` both point to `docs/agent/ALWAYS-APPLY-RULES.md`.
- CI: malware scan, then lint, type-check, format check and build.
- PR template.
- Branches: `main` and `development`.

**Verification:** lint, type-check, format and build all pass. Light, dark and mobile rendering checked. Headers, sitemap and robots checked. Hooks reject bad commits. CI goes green after the push.

## Outcome

### Delivered

- **Versions:** Next.js 16.4.6 (Cache Components, Partial Prefetching, React Compiler, Turbopack), React 19.3.1, Tailwind 4.3, shadcn 4.23 (radix-nova), Yarn 4.18.1 (vendored through `yarnPath`).
- **Theme:**
  - Token system in `app/globals.css`: brand palette (teal and navy placeholders), then semantic tokens, then `.dark`.
  - Extra tokens beyond shadcn's: `heading`, `surface`, `primary-*`/`secondary-*` variants, `highlight`, status colours, and `inverse` for bands that stay dark in both themes.
  - Utilities: `container-page` and `section`.
- **Layout shell:** TopBar, Header (desktop NavigationMenu and mobile Sheet drawer), Footer, floating WhatsApp button, skip link, and a placeholder home page (hero and three service cards).
- **SEO and security:**
  - Metadata with a title template and `metadataBase`, plus `sitemap.ts`, `robots.ts`, `manifest.ts` and JSON-LD.
  - Security headers, confirmed with curl.
  - Env validation, which deliberately fails the build when the site URL is missing.
- **Tooling:**
  - ESLint, Prettier, Husky, lint-staged, commitlint and the malware scanner.
  - GitHub Actions CI.
  - Docs: rules, best practices and branching strategy.
  - Recommended VS Code extensions and settings.
- **Verified:**
  - `yarn check` and `yarn build` pass, and all routes are statically prerendered.
  - Light, dark and mobile screenshots reviewed.
  - commitlint rejected a bad message, and lint-staged blocked a file with lint errors.

### Changes from the plan

- **TypeScript 6.0.3 instead of 7, and ESLint 9.39 instead of 10.** typescript-eslint requires TypeScript below 6.1, and eslint-plugin-react, eslint-plugin-import and eslint-plugin-jsx-a11y don't support ESLint 10 yet. Upgrade both once `eslint-config-next` supports them.
- **Tailwind is wired through `@tailwindcss/turbopack`**, the Next 16.4 default, instead of `@tailwindcss/postcss`.
- **CSP is set by header with no nonces**, and it allows `'unsafe-inline'` scripts. Nonces would force every page to render dynamically. This is the approach the Next docs recommend for static sites.
- **shadcn 4 changes:**
  - The `cn` package (shadcn's own) replaces `clsx` and `tailwind-merge`.
  - `field` replaces the old `form` component.
- **`react-icons` was added for social logos**, because lucide 1.x no longer ships brand icons.
- **The HRMS `React.useState` rule is implemented with `no-restricted-syntax`.** In ESLint 9, `no-restricted-imports` with `importNames` also flags `import * as React`.
- **Style-only lint rules are turned off for the vendored `components/ui`.**
- **CODEOWNERS is left out** until GitHub usernames are known.

### Still open

- Push to GitHub once the repo URL is provided, then confirm CI is green.
- Protect the `main` and `development` branches on GitHub.
- Vercel: import the repo and set `NEXT_PUBLIC_SITE_URL`.
