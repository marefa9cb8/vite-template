import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    name: 'ignore files',
    ignores: ['dist/*', '*.config.{js,ts}'],
  },
  {
    name: 'global settings',
    languageOptions: {
      parser: tseslint.parser,
      globals: { ...globals.browser },
      parserOptions: { project: './tsconfig.json' },
    },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    settings: { react: { version: 'detect' } },
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  eslintPluginReactHooks.configs['recommended-latest'],
  eslintConfigPrettier,
  {
    name: 'Type Importを強制するRules',
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },
  {
    name: '一時的にOFFにしたRules',
    rules: {},
  },
]
