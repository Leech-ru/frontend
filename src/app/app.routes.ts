import { Routes } from "@angular/router";

import { adminGuard, authGuard } from "./guards";

export const routes = [
  {
    path: "",
    loadComponent: () => import("@/app/layouts/full"),
    children: [
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
        path: "cosmetics/category",
        title: "Каталог косметики",
        loadComponent: () => import("@/pages/cosmetics/catalog"),
      },
      {
        path: "cosmetics/category/:id",
        title: "Каталог косметики",
        loadComponent: () => import("@/pages/cosmetics/category"),
      },
      {
        path: "cosmetics/item/:id",
        loadComponent: () => import("@/pages/cosmetics/item"),
      },
      {
        path: "cosmetics/buy",
        title: "Купить косметику",
        loadComponent: () => import("@/pages/cosmetics/faqbuy"),
      },
      {
        path: "contact",
        title: "Контакты",
        loadComponent: () => import("@/pages/contact"),
      },
      {
        path: "about",
        title: "О центре",
        loadComponent: () => import("@/pages/about"),
      },
      {
        path: "admin",
        title: "Панель администрации",
        loadComponent: () => import("@/pages/admin"),
        canActivate: [adminGuard],
        canMatch: [adminGuard],
      },
    ],
  },
  {
    path: "",
    loadComponent: () => import("@/app/layouts/bare"),
    children: [
      {
        path: "leech/buy",
        title: "Заказать пиявок",
        loadComponent: () => import("@/pages/leech/buy"),
      },
      {
        path: "register",
        title: "Регистрация",
        loadComponent: () => import("@/pages/register"),
        canActivate: [authGuard],
        canMatch: [authGuard],
      },
      {
        path: "login",
        title: "Вход",
        loadComponent: () => import("@/pages/login"),
        canActivate: [authGuard],
        canMatch: [authGuard],
      },
    ],
  },
] as const satisfies Routes;
