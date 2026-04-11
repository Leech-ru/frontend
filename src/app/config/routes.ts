import { authGuard } from "@/entities/user";
import { cosmeticItemResolver } from "@/pages/(cosmetics)/item";
import { Routes } from "@angular/router";

export const routes: Routes = [
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
        loadComponent: () => import("@/pages/(leech)/about"),
      },
      {
        path: "cosmetics",
        title: "Каталог косметики",
        loadComponent: () => import("@/pages/(cosmetics)/catalog"),
      },
      {
        path: "cosmetics/categories/:id",
        title: "Каталог косметики",
        loadComponent: () => import("@/pages/(cosmetics)/category"),
      },
      {
        path: "cosmetics/:id",
        loadComponent: () => import("@/pages/(cosmetics)/item"),
        resolve: {
          item: cosmeticItemResolver,
        },
      },
      {
        path: "cosmetics/buy",
        title: "Купить косметику",
        loadComponent: () => import("@/pages/(cosmetics)/faqbuy"),
      },
      {
        path: "about",
        title: "О центре",
        loadComponent: () => import("@/pages/about"),
      },
      {
        path: "admin",
        // canMatch: [adminGuard],
        // canActivate: [adminGuard],
        loadComponent: () => import("@/app/layouts/admin"),
        children: [
          {
            path: "",
            redirectTo: "cosmetics",
            pathMatch: "full",
          },
          {
            path: "cosmetics",
            title: "Косметика",
            loadComponent: () => import("@/pages/(admin)/cosmetics"),
          },
        ],
      },
    ],
  },
  {
    path: "",
    loadComponent: () => import("@/app/layouts/bare"),
    children: [
      {
        path: "leech/order",
        title: "Заказать пиявок",
        loadComponent: () => import("@/pages/(leech)/order"),
      },
    ],
  },
  {
    path: "",
    canMatch: [authGuard],
    canActivate: [authGuard],
    loadComponent: () => import("../layouts/auth"),
    children: [
      {
        path: "login",
        title: "Вход",
        loadComponent: () => import("@/pages/(auth)/login"),
      },
      {
        path: "register",
        title: "Регистрация",
        loadComponent: () => import("@/pages/(auth)/register"),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "",
  },
];
