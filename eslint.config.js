import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'

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
    plugins: { react: eslintPluginReact },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintConfigPrettier,
  {
    name: '一時的にOFFにしたRules',
    rules: {},
  },
]
