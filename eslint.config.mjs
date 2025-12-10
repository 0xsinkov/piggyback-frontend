import { resolve } from 'node:path';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import pluginQuery from '@tanstack/eslint-plugin-query';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import reactCompiler from 'eslint-plugin-react-compiler';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const project = resolve(import.meta.dirname, 'tsconfig.json');

const eslintConfig = [
  js.configs.recommended,
  ...compat.config({
    extends: [
      'eslint:recommended',
      'prettier',
      'next',
      'plugin:@next/next/recommended',
    ],
  }),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsparser,
      parserOptions: {
        project,
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@tanstack/query': pluginQuery,
      prettier: prettierPlugin,
      unicorn: eslintPluginUnicorn,
      'eslint-comments': eslintCommentsPlugin,
      'react-compiler': reactCompiler,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // TypeScript Rules
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/no-loop-func': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: false,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-useless-constructor': 'error',
      'import/default': 'off',
      'import/export': 'off',
      'import/namespace': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/consistent-type-exports': [
        'warn',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowExpressions: true },
      ],
      '@typescript-eslint/method-signature-style': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        // Anything type-like should be written in PascalCase.
        {
          format: ['PascalCase'],
          selector: ['typeLike', 'enumMember'],
        },
        // Interfaces cannot be prefixed with `I`, or have restricted names.
        {
          custom: {
            match: false,
            regex: '^I[A-Z]|^(Interface|Props|State)$',
          },
          format: ['PascalCase'],
          selector: 'interface',
        },
      ],
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      '@typescript-eslint/no-unnecessary-qualifier': 'warn',
      '@typescript-eslint/prefer-regexp-exec': 'warn',
      '@typescript-eslint/require-array-sort-compare': [
        'error',
        { ignoreStringArrays: true },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      // TanStack Query Rules
      '@tanstack/query/exhaustive-deps': 'error',

      // Vercel Style Guide Rules
      'array-callback-return': ['error', { allowImplicit: true }],
      'block-scoped-var': 'error',
      curly: ['warn', 'multi-line'],
      'default-case-last': 'error',
      eqeqeq: 'error',
      'grouped-accessor-pairs': 'error',
      'no-alert': 'error',
      'no-caller': 'error',
      'no-constructor-return': 'error',
      'no-else-return': 'warn',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-floating-decimal': 'error',
      'no-implicit-coercion': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': ['error'],
      'no-lone-blocks': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': 'error',
      'no-proto': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'warn',
      'prefer-named-capture-group': 'error',
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
      'prefer-regex-literals': 'error',
      yoda: 'warn',
      'eslint-comments/require-description': 'error',
      'no-useless-computed-key': 'warn',
      'no-useless-rename': 'warn',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-const': 'warn',
      'prefer-numeric-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'warn',
      'symbol-description': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'warn',
      'import/no-absolute-path': 'error',
      'import/no-cycle': 'error',
      'import/no-default-export': 'error',
      'import/no-extraneous-dependencies': ['error', { includeTypes: true }],
      'import/no-mutable-exports': 'error',
      'import/no-relative-packages': 'warn',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': ['error'],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // Packages
            'internal', // Aliased modules
            'parent', // Relative parent
            'sibling', // Relative sibling
            'index', // Relative index
          ],
          'newlines-between': 'never',
        },
      ],
      'jsx-a11y/no-onchange': 'off',
      'no-console': 'error',
      'no-constant-binary-expression': 'error',
      'no-promise-executor-return': 'error',
      'no-template-curly-in-string': 'error',
      'no-unreachable-loop': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/button-has-type': 'warn',
      'react/function-component-definition': 'warn',
      'react/hook-use-state': 'warn',
      'react/jsx-boolean-value': 'warn',
      'react/jsx-curly-brace-presence': 'warn',
      'react/jsx-fragments': 'warn',
      'react/jsx-no-leaked-render': 'warn',
      'react/jsx-no-target-blank': [
        'error',
        {
          allowReferrer: true,
        },
      ],
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react/jsx-pascal-case': 'warn',
      'react/no-array-index-key': 'warn',
      'react/no-unstable-nested-components': 'error',
      'react/self-closing-comp': 'warn',
      camelcase: [
        'error',
        {
          allow: ['^UNSAFE_'],
          ignoreDestructuring: false,
          properties: 'never',
        },
      ],
      'func-names': ['error', 'as-needed'],
      'new-cap': ['error', { capIsNew: false }],
      'new-parens': 'warn',
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      'no-lonely-if': 'warn',
      'no-multi-assign': ['error'],
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'prefer-object-spread': 'warn',
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
      'unicorn/prefer-node-protocol': 'warn',
      'no-label-var': 'error',
      'no-undef-init': 'warn',
      'no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: false,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],

      // React Compiler Rules
      'react-compiler/react-compiler': 'error',
    },
  },
  {
    files: [
      'next.config.mjs',
      'prettier.config.mjs',
      'unlighthouse.config.ts',
      'tailwind.config.ts',
      'src/app/**/page.tsx',
      'src/app/**/layout.tsx',
      'src/app/**/not-found.tsx',
      'src/app/**/*error.tsx',
      'src/app/apple-icon.tsx',
      'src/app/**/opengraph-image.tsx',
      'src/app/sitemap.ts',
      'src/app/robots.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
      'import/prefer-default-export': ['error', { target: 'any' }],
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      '@typescript-eslint/disable-type-checked': 'error',
    },
  },
  {
    ignores: [
      'node_modules',
      'coverage',
      'src/components/ui/*.tsx',
      'tailwind.config.ts',
      'postcss.config.mjs',
      'next.config.mjs',
    ],
  },
];

export default eslintConfig;
