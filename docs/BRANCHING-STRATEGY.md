# Branching strategy

| Branch                                                        | Purpose                                      | Deploys to                 |
| ------------------------------------------------------------- | -------------------------------------------- | -------------------------- |
| `main`                                                        | Production-ready code                        | Vercel production          |
| `development`                                                 | Integration branch                           | Vercel preview             |
| `feat/<short-name>`, `fix/<short-name>`, `chore/<short-name>` | Day-to-day work, branched from `development` | Vercel preview, one per PR |

`development` is the **default branch on GitHub**: clones, new PRs and the repo landing page all target it. `main` only changes through release PRs and is the only branch that deploys to production.

## Flow

1. Branch from `development`, e.g. `git switch -c feat/home-hero development`.
2. Write commits in the Conventional Commits format, which commitlint enforces: `feat: add hero slider`, `fix(header): close mobile menu on navigate`.
3. Open a PR into `development`. CI must pass (malware scan, lint, type-check, format and build).
4. To release, open a PR from `development` into `main`.

Don't force-push to `main` or `development`. Protect both branches on GitHub so a PR and passing CI are required.

## Git hooks (Husky)

| Hook         | Runs                                                                                    |
| ------------ | --------------------------------------------------------------------------------------- |
| `pre-commit` | Malware scan of staged files, then lint-staged (ESLint and Prettier), then `type-check` |
| `commit-msg` | commitlint (Conventional Commits)                                                       |
| `pre-push`   | Malware scan of all tracked files                                                       |
| `post-merge` | Malware scan (warns only)                                                               |
