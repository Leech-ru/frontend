import { RoutePath } from "@/app/@x/route";

import { NavigationItem } from "../model/navigation.model";

export const LOGO_ROUTER_LINK = "/" as const satisfies RoutePath;

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "Главная",
    routerLink: "/",
  },
  {
    label: "Пиявки",
    routerLink: "/leech",
    children: [
      {
        label: "Заказать пиявок",
        routerLink: "/leech/buy",
      },
      {
        label: "О пиявках",
        routerLink: "/leech/about",
      },
    ],
  },
  {
    label: "Косметика",
    routerLink: "/cosmetics/category",
    children: [
      {
        label: "Каталог косметики",
        routerLink: "/cosmetics/category",
      },
      {
        label: "Где купить косметику?",
        routerLink: "/cosmetics/buy",
      },
    ],
  },
  {
    label: "Контакты",
    routerLink: "/contact",
  },
  {
    label: "О центре",
    routerLink: "/about",
  },
];

export const ADMIN_NAVIGATION_ITEM: NavigationItem = {
  label: "Панель управления",
  routerLink: "/admin-menu",
};
