import { LeechBuyPackage } from "../model/types";

export const LEECH_BUY_FORM_VALUE_LOCAL_STORAGE_KEY = "leechBuyFormValue";

export const LEECH_BUY_MIN_COUNT = 50;

export const LEECH_BUY_COMMENT_MAX_LENGTH = 512;

export const LEECH_BUY_PACKAGES: LeechBuyPackage[] = [
  {
    id: 1,
    icon: "@tui.waves",
    name: "Вода",
    description: "Транспортировка не более 1-х суток",
    color: "#fff",
    background: "#526ed3",
  },
  {
    id: 2,
    icon: "@tui.droplet",
    name: "Гель",
    description: "Транспортировка не более 5 суток",
    color: "#fff",
    background: "#2fad96",
  },
  {
    id: 3,
    icon: "@tui.earth",
    name: "Торф",
    description: "Транспортировка не более 5 суток",
    color: "#fff",
    background: "#9d6f64",
  },
];
