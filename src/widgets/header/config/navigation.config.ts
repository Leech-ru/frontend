import { NavigationItem } from "../model/navigation.model";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "Главная",
    routerLink: "/",
  },
  {
    label: "Пиявки",
    routerLink: "/leech",
  },
  {
    label: "Косметика",
    routerLink: "/cosmetics",
  },
  {
    label: "О центре",
    routerLink: "/about",
  },
  {
    label: "Управление",
    routerLink: "/admin",
    roles: [2, 3],
  },
];
