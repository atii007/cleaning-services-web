# Always-apply rules

The single source of truth for humans and AI agents. `CLAUDE.md` and `AGENTS.md` both point here. Edit this file only.

## 1. Workflow gates

- **Ask before** you commit, push, add a dependency, or make an architecture or scope decision.
- Read `node_modules/next/dist/docs/` before using a Next.js API you are unsure of. This is Next 16, with Cache Components and `proxy.ts` (formerly middleware).
- Run `yarn check` and `yarn build` before saying work is done.
- **Track every plan in the repo.** Once a plan is approved, save it as `docs/plans/phase-NN-<name>.md` with status `In progress` **before** writing code, and update the roadmap in `docs/plans/README.md`. When the work is finished, fill in the plan's **Outcome** section (what was delivered, any changes from the plan, what is still open), set the status to `Done`, and commit those changes with the work.

## 2. UI and UX

- **Use theme tokens only.** Never use raw colours (`bg-[#fff]`, `text-white`, `bg-teal-600`). Tokens live in `app/globals.css`. If one is missing, add a semantic token rather than a one-off colour.
- **Reuse before you create.** Check `components/ui` (shadcn primitives) first, then `components/shared`, then `components/layout`.
- **Mobile first.** Every section works from 360px upward. Use `container-page` for horizontal gutters and `section` for vertical rhythm.
- **Prepare for RTL.** Use logical utilities (`ms-`, `pe-`, `start-`, `end-`, `border-s`). Flip directional icons with `rtl:rotate-180`.
- **Accessibility:**
  - semantic landmarks
  - one `<h1>` per page
  - labelled controls
  - visible focus states
  - `alt` on every meaningful image
  - `aria-hidden` on decorative icons
- **Motion** must respect `prefers-reduced-motion`.
- **Loading states:** show a skeleton and load content in place. Never `return null` while loading.

## 3. Content

- All copy, links and contact details live in typed files under `content/`. Components never hard-code business copy.
- Content is **placeholder** until branding is final. Keep it realistic so layouts are tested with real-length text.

## 4. Architecture

- `app/` holds **thin route files only**. They compose sections from `sections/<page>/`.
- Use Server Components by default. Add `'use client'` only on the smallest interactive leaf.
- Cache Components is on. Wrap anything dynamic or time-based in `'use cache'` or `<Suspense>`.
- Form validation uses Zod schemas in `schemas/`, shared by the client (react-hook-form) and server actions.
- Read environment variables only through `lib/env.ts`.
