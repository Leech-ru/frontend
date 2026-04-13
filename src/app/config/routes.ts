import { cosmeticItemResolver } from "@/pages/(cosmetics)/item";
import { Routes } from "@angular/router";
import { adminGuard } from "../guards/admin";
import { authGuard } from "../guards/auth";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("@/app/layouts/base"),
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
        path: "leech/order",
        data: { showHeaderMobile: false, showFooter: false },
        title: "Заказать пиявок",
        loadComponent: () => import("@/pages/(leech)/order"),
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
        path: "",
        data: { showServerLoading: true },
        children: [
          {
            path: "",
            canActivate: [authGuard],
            data: { showHeader: false, showFooter: false },
            loadComponent: () => import("@/app/layouts/auth"),
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
            path: "admin",
            data: { showFooter: false },
            canActivate: [adminGuard],
            children: [
              {
                path: "",
                outlet: "subHeader",
                loadComponent: () => import("@/widgets/(admin)/tabs"),
              },
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
    ],
  },
  {
    path: "**",
    redirectTo: "",
  },
];
