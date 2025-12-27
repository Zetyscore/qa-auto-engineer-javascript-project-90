import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginPlaywright from 'eslint-plugin-playwright'
import { includeIgnoreFile } from '@eslint/compat'
import { fileURLToPath } from 'node:url'
import stylistic from '@stylistic/eslint-plugin'

const gitIgnorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default [
  includeIgnoreFile(gitIgnorePath),
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
  }),
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/jsx-uses-react': 0,
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/padded-blocks': ['error', 'never'],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.spec.js', '**/tests/**/*.js'],
    ...pluginPlaywright.configs['flat/recommended'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...pluginPlaywright.configs['flat/recommended'].rules,
      'playwright/expect-expect': ['warn', {
        assertFunctionNames: ['expect', 'AssertionHelper.*'],
      }],
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-conditional-in-test': 'warn',
      'playwright/valid-expect': 'error',
      'playwright/no-standalone-expect': 'off',
    },
  },
]
