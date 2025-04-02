import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
//import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss'

/** @type {import("eslint").Linter.Config[]} */
export default [
  // ==========================================
  // ベース設定
  // ==========================================
  {
    name: 'global settings',
    languageOptions: {
      parser: tseslint.parser,
      globals: { ...globals.browser },
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    settings: { react: { version: 'detect' } },
  },
  {
    name: 'ignore settings',
    ignores: ['dist/*', '*.config.{js,ts}'],
  },
  // ==========================================
  // 標準設定 (推奨設定を活用)
  // ==========================================
  { name: '@eslint/js', ...js.configs.recommended },
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  { name: 'react', ...eslintPluginReact.configs.flat.recommended },
  { name: 'react-jsx', ...eslintPluginReact.configs.flat['jsx-runtime'] },
  eslintPluginReactHooks.configs['recommended-latest'],
  // eslintPluginTailwindcss.configs.recommended,

  // ==========================================
  // 推奨設定にないカスタムルール
  // ==========================================
  {
    name: 'custom rules',
    rules: {
      // React 関連の追加ルール
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/self-closing-comp': 'error',

      // 型インポートに関するルール
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',

      // コード品質に関するルール
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
    },
  },

  // ==========================================
  // 一時的に無効化したルール
  // ==========================================
  {
    name: '一時的に無効化したルール',
    rules: {},
  },

  // ==========================================
  // Prettier (他の設定を上書きするため最後に配置)
  // ==========================================
  eslintConfigPrettier,
]
