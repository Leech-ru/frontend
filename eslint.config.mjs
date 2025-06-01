import angularParser from "@angular-eslint/template-parser";
import typescriptParser from "@typescript-eslint/parser";
import angularPlugin from "angular-eslint";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import typescriptPlugin from "typescript-eslint";

/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.Config[]} */
export default [
  {
    ignores: [".angular", "dist", "node_modules", "public"],
  },
  ...typescriptPlugin.configs.recommendedTypeChecked,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  ...angularPlugin.configs.tsRecommended,
  prettierPlugin,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ["**/*.{html}"],
    ...angularPlugin.configs.templateRecommended,
    ...angularPlugin.configs.templateAccessibility,
    languageOptions: {
      parser: angularParser,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    languageOptions: {
      parser: typescriptParser,
    },
    rules: {
      "no-console": "off",

      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: false,
          },
          "newlines-between": "always",
          warnOnUnassignedImports: false,
          pathGroups: [
            {
              pattern: "**/*.css",
              group: "type",
              position: "before",
            },
          ],
          groups: [
            "type",
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
          ],
        },
      ],

      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/method-signature-style": "error",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-wrapper-object-types": "error",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/explicit-member-accessibility": "error",

      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
        },
      ],

      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: true,
        },
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unnecessary-condition": "error",
    },
  },
];
