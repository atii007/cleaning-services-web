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
3. Open a PR into `development`. PR checks must pass (malware scan, lint, type-check, format and build).
   It runs only on pull requests, not again after the merge.
4. To release, open a PR from `development` into `main`.

Don't force-push to `main` or `development`. Protect both branches on GitHub so a PR and passing PR checks are required.

## PR checks

`.github/workflows/pr-checks.yml` (shown as **PR checks (scan & verify)** in GitHub) is a single workflow. It runs on every pull request into `development` or `main`, and it can also be started by hand from the Actions tab.

| Stage | Check                                   | Runs                                         |
| ----- | --------------------------------------- | -------------------------------------------- |
| 1     | `Malware scan`                          | First, before any dependencies are installed |
| 2     | `Lint`, `Type-check`, `Format`, `Build` | In parallel, once the scan passes            |

Each check is reported separately on the PR. Mark all five as required status checks in branch protection.

## Git hooks (Husky)

| Hook         | Runs                                                                                    |
| ------------ | --------------------------------------------------------------------------------------- |
| `pre-commit` | Malware scan of staged files, then lint-staged (ESLint and Prettier), then `type-check` |
| `commit-msg` | commitlint (Conventional Commits)                                                       |
| `pre-push`   | Malware scan of all tracked files                                                       |
| `post-merge` | Malware scan (warns only)                                                               |
