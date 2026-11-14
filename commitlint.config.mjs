/** Conventional Commits: feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [0],
  },
}

export default config
