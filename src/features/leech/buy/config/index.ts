import { LeechBuyPackage } from "../model/types";

export const LEECH_BUY_MIN_COUNT = 50;

export const LEECH_BUY_COMMENT_MAX_LENGTH = 512;

export const LEECH_BUY_PACKAGES: LeechBuyPackage[] = [
  {
    id: 1,
    name: "Вода",
    description: "Транспортировка не более 1-х суток",
  },
  {
    id: 2,
    name: "Гель",
    description: "Транспортировка не более 5 суток",
  },
  {
    id: 3,
    name: "Торф",
    description: "Транспортировка не более 5 суток",
  },
];
