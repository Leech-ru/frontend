import { LeechOrderPackage } from "../model/types";

export const LEECH_ORDER_FORM_VALUE_LOCAL_STORAGE_KEY = "leechOrderFormValue";

export const LEECH_ORDER_MIN_COUNT = 50;

export const LEECH_ORDER_COMMENT_MAX_LENGTH = 512;

export const LEECH_ORDER_PACKAGES: LeechOrderPackage[] = [
  {
    id: 0,
    icon: "@tui.waves",
    name: $localize`Вода`,
    description: $localize`Транспортировка не более 1-х суток`,
    color: "#fff",
    background: "#526ed3",
  },
  {
    id: 1,
    icon: "@tui.droplet",
    name: $localize`Гель`,
    description: $localize`Транспортировка не более 5 суток`,
    color: "#fff",
    background: "#2fad96",
  },
  {
    id: 2,
    icon: "@tui.earth",
    name: $localize`Торф`,
    description: $localize`Транспортировка не более 5 суток`,
    color: "#fff",
    background: "#9d6f64",
  },
];
