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
    routerLink: "/cosmetic/category",
    children: [
      {
        label: "Каталог косметики",
        routerLink: "/cosmetic/category",
      },
      {
        label: "Где купить косметику?",
        routerLink: "/cosmetic/buy",
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
