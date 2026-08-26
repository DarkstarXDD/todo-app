import eslintJS from "@eslint/js"
import tsEslintPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import eslintPluginImport from "eslint-plugin-import"
import eslintJsxA11y from "eslint-plugin-jsx-a11y"
import eslintReact from "eslint-plugin-react"
import eslintReactHooks from "eslint-plugin-react-hooks"
// import eslintReactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["dist"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      globals: globals.browser,

      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },

    settings: {
      react: {
        version: "19",
      },
    },

    plugins: {
      react: eslintReact,
      "react-hooks": eslintReactHooks,
      // "react-refresh": eslintReactRefresh,
      "jsx-a11y": eslintJsxA11y,
      import: eslintPluginImport,
      "@typescript-eslint": tsEslintPlugin,
    },

    rules: {
      ...eslintJS.configs.recommended.rules,
      ...eslintReact.configs.recommended.rules,
      ...eslintReact.configs["jsx-runtime"].rules,
      ...eslintReactHooks.configs.recommended.rules,
      ...eslintJsxA11y.configs.recommended.rules,
      ...tsEslintPlugin.configs.recommended.rules,

      // "no-use-before-define": "error",
      "no-duplicate-imports": "error",
      camelcase: "error",

      "react/jsx-no-target-blank": "off",
      "react/prop-types": "off",

      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/prefer-tag-over-role": "error",

      // "react-refresh/only-export-components": [
      //   "warn",
      //   { allowConstantExport: true },
      // ],

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",
    },
  },
]
