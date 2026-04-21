import { categoryResolver } from "@/pages/(admin)/(cosmetics)/category";
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
        title: $localize`Главная`,
        loadComponent: () => import("@/pages/home"),
      },
      {
        path: "leech",
        children: [
          {
            path: "",
            title: "О пиявке",
            loadComponent: () => import("@/pages/(leech)/about"),
          },
          {
            path: "order",
            data: { showHeaderMobile: false, showFooter: false },
            title: "Заказать пиявок",
            loadComponent: () => import("@/pages/(leech)/order"),
          },
        ],
      },
      {
        path: "cosmetics",
        children: [
          {
            path: "",
            title: "Каталог косметики",
            loadComponent: () => import("@/pages/(cosmetics)/catalog"),
          },
          {
            path: "categories/:id",
            title: "Каталог косметики",
            loadComponent: () => import("@/pages/(cosmetics)/category"),
          },
          {
            path: ":id",
            loadComponent: () => import("@/pages/(cosmetics)/item"),
            resolve: {
              item: cosmeticItemResolver,
            },
          },
        ],
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
                title: "Информация",
                loadComponent: () => import("@/pages/(admin)/info"),
              },
              {
                path: "cosmetics",
                title: "Косметика",
                loadComponent: () =>
                  import("@/pages/(admin)/(cosmetics)/categories"),
              },
              {
                path: "cosmetics/categories/:id",
                title: "Категория",
                loadComponent: () =>
                  import("@/pages/(admin)/(cosmetics)/category"),
                resolve: {
                  category: categoryResolver,
                },
              },
              {
                path: "partners",
                title: "Партнёры",
                loadComponent: () => import("@/pages/(admin)/partners"),
              },
              {
                path: "users",
                title: "Пользователи",
                loadComponent: () => import("@/pages/(admin)/users"),
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
