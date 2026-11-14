# cleaning-services-web

A marketing website for a cleaning-services business: deep cleaning, maid services and pest control.
It is built for production on the latest Next.js stack. All content is currently placeholder.

## Stack

|           |                                                                                                                 |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Cache Components, React Compiler, Turbopack) and React 19                               |
| Language  | TypeScript 6 (`strict`, `noUncheckedIndexedAccess`)                                                             |
| Styling   | Tailwind CSS 4 with token-based theming in `app/globals.css`, plus next-themes for light, dark and system modes |
| UI        | shadcn/ui (Radix), lucide-react, react-icons (brand logos), motion, sonner                                      |
| Forms     | react-hook-form and Zod 4                                                                                       |
| Tooling   | ESLint 9 (flat config), Prettier 3 with the Tailwind plugin, Husky, lint-staged, commitlint                     |
| Hosting   | Vercel                                                                                                          |

TypeScript is pinned to 6.0 and ESLint to 9 because `eslint-config-next`'s plugins (typescript-eslint, eslint-plugin-react and eslint-plugin-import) don't support TypeScript 7 or ESLint 10 yet.

## Getting started

```bash
nvm use                      # Node 22 (lts/jod)
yarn install                 # Yarn 4 is vendored in .yarn/releases, so no global install is needed
cp .env.example .env.local
yarn dev                     # http://localhost:3000
```

## Environment variables

All variables are validated in `lib/env.ts`, and `.env.example` documents each one.

| Variable                                                                                                 | Required | Purpose                                                                                                       |
| -------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                                                                   | Yes\*    | Canonical URL for metadata, sitemap and robots. \*On Vercel it falls back to the production URL.              |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `CONTACT_FORM_RECIPIENT` | No       | Turn on the "Send by email" option on `/contact`. Set all of them, or none. The build fails on a partial set. |

The Contact page is prerendered, so after adding or changing the SMTP variables on Vercel, **redeploy** for the email button to appear.

## Scripts

| Script                              | Does                                           |
| ----------------------------------- | ---------------------------------------------- |
| `yarn dev`                          | Starts the dev server                          |
| `yarn build` / `yarn start`         | Production build, then serve it                |
| `yarn lint` / `yarn lint:fix`       | Run ESLint, or run it and auto-fix             |
| `yarn format` / `yarn format:check` | Format with Prettier, or check formatting only |
| `yarn type-check`                   | Generate route types, then run `tsc --noEmit`  |
| `yarn check`                        | Lint, type-check and format check together     |
| `yarn security:scan`                | Scan all tracked files for malware             |

## Docs

- [Always-apply rules](docs/agent/ALWAYS-APPLY-RULES.md)
- [Code best practices and folder map](docs/CODE-BEST-PRACTICES.md)
- [Branching strategy and git hooks](docs/BRANCHING-STRATEGY.md)
- [Content guide: replacing placeholder data](docs/CONTENT-GUIDE.md)

## Deployment (Vercel)

1. Import the GitHub repo in Vercel. It detects Next.js and Yarn 4 automatically.
2. Set `NEXT_PUBLIC_SITE_URL` for Production. Preview builds fall back to the Vercel URL.
3. Production branch: `main`. Set it explicitly in **Settings → Environments → Production → Branch Tracking**. Vercel defaults to the GitHub default branch, which is `development`.
4. Every push to `development` and to feature branches gets a preview deployment.
