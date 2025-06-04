import parserAngular from "@angular-eslint/template-parser";
import parserTypescript from "@typescript-eslint/parser";
import pluginAngular from "angular-eslint";
import pluginImport from "eslint-plugin-import-x";
import pluginTypescript from "typescript-eslint";

export default pluginTypescript.config([
  {
    ignores: [".angular", "dist", "node_modules", "public"],
  },
  pluginAngular.configs.tsRecommended,
  pluginImport.flatConfigs.recommended,
  pluginImport.flatConfigs.typescript,
  pluginTypescript.configs.recommendedTypeChecked,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: parserTypescript,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "no-console": "off",

      "import-x/no-named-as-default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
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

      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/method-signature-style": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-wrapper-object-types": "error",
      "@typescript-eslint/triple-slash-reference": "off",

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
  },
  {
    files: ["**/*.{html}"],
    ...pluginAngular.configs.templateAccessibility,
    ...pluginAngular.configs.templateRecommended,
    languageOptions: {
      parser: parserAngular,
      parserOptions: {
        project: true,
      },
    },
  },
]);
