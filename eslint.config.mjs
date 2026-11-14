import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      // ── Core ──────────────────────────────────────────────────────────
      'no-console': ['error', { allow: ['info', 'error', 'warn', 'debug'] }],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-else-return': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],

      // Hooks are used as React.useState / React.useEffect … (HRMS convention)
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "ImportDeclaration[source.value='react'] > ImportSpecifier[imported.name=/^use(State|Effect|LayoutEffect|Context|Reducer|Callback|Memo|Ref|SyncExternalStore|Transition|Id)$/]",
          message:
            "Use React.useState / React.useEffect … via `import * as React from 'react'`.",
        },
      ],

      // ── TypeScript ────────────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': true, 'ts-expect-error': true },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // ── React ─────────────────────────────────────────────────────────
      'react/self-closing-comp': 'error',
      'react/jsx-key': 'warn',
      'react/no-array-index-key': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ── Imports: external → @/ → relative, side-effect imports last ──
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^next', '^@?\\w'],
            ['^@/'],
            ['^\\.'],
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },

  // shadcn primitives are vendored/generated code — keep upstream style so
  // `shadcn add --overwrite` produces clean diffs. Correctness rules stay on.
  {
    files: ['components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': 'off',
      'simple-import-sort/imports': 'off',
      'simple-import-sort/exports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      eqeqeq: 'off',
      'react/no-array-index-key': 'off',
      // Upstream embla carousel sync pattern
      'react-hooks/set-state-in-effect': 'off',
    },
  },

  // Must stay last: turns off rules that conflict with Prettier.
  prettier,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    '.yarn/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
