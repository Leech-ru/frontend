import { Routes } from "@angular/router";

export const routes = [
  {
    path: "",
    title: "Главная",
    loadComponent: () => import("@/pages/home"),
  },
  {
    path: "leech",
    title: "Пиявки",
    loadComponent: () => import("@/pages/index"),
  },
  {
    path: "leech/buy",
    title: "Заказать пиявок",
    loadComponent: () => import("@/pages/index"),
  },
  {
    path: "leech/about",
    title: "О пиявках",
    loadComponent: () => import("@/pages/index"),
  },
  {
    path: "cosmetics",
    title: "Косметика",
    loadComponent: () => import("@/pages/index"),
  },
  {
    path: "cosmetics/catalog",
    title: "Каталог косметики",
    loadComponent: () => import("@/pages/index"),
  },
  {
    path: "cosmetics/buy",
    title: "Купить косметику",
    loadComponent: () => import("@/pages/index"),
  },
  {
    path: "contact",
    title: "Контакты",
    loadComponent: () => import("@/pages/index"),
  },
  {
    path: "about",
    title: "О центре",
    loadComponent: () => import("@/pages/index"),
  },
] as const satisfies Routes;
