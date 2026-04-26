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
            title: $localize`О пиявке`,
            loadComponent: () => import("@/pages/(leech)/docs"),
          },
          {
            path: "order",
            data: { showHeaderMobile: false, showFooter: false },
            title: $localize`Заказать пиявок`,
            loadComponent: () => import("@/pages/(leech)/order"),
          },
          {
            path: ":slug",
            title: $localize`О пиявке`,
            loadComponent: () => import("@/pages/(leech)/docs"),
          },
        ],
      },
      {
        path: "cosmetics",
        children: [
          {
            path: "",
            title: $localize`Каталог косметики`,
            loadComponent: () => import("@/pages/(cosmetics)/catalog"),
          },
          {
            path: "categories/:id",
            title: $localize`Каталог косметики`,
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
        title: $localize`О центре`,
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
                title: $localize`Вход`,
                loadComponent: () => import("@/pages/(auth)/login"),
              },
              {
                path: "register",
                title: $localize`Регистрация`,
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
                title: $localize`Информация`,
                loadComponent: () => import("@/pages/(admin)/info"),
              },
              {
                path: "cosmetics",
                title: $localize`Косметика`,
                loadComponent: () =>
                  import("@/pages/(admin)/(cosmetics)/categories"),
              },
              {
                path: "cosmetics/categories/:id",
                title: $localize`Категория`,
                loadComponent: () =>
                  import("@/pages/(admin)/(cosmetics)/category"),
                resolve: {
                  category: categoryResolver,
                },
              },
              {
                path: "partners",
                title: $localize`Партнёры`,
                loadComponent: () => import("@/pages/(admin)/partners"),
              },
              {
                path: "users",
                title: $localize`Пользователи`,
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
