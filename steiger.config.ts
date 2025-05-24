import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      "fsd/insignificant-slice": "off",
    },
  },
  {
    files: ["./src/shared/**"],
    rules: {
      "fsd/public-api": "off",
      "fsd/no-public-api-sidestep": "off",
      "fsd/no-reserved-folder-names": "off",
    },
  },
  {
    files: ["./src/app/@x/**"],
    rules: {
      "fsd/no-public-api-sidestep": "off",
      "fsd/forbidden-imports": "off",
    },
  },
]);
