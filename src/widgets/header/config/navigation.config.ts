import { NavigationItem } from "../model/navigation.model";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "Главная",
    routerLink: "/",
    section: "navigation",
  },
  {
    label: "Пиявки",
    routerLink: "/leech",
    section: "navigation",
  },
  {
    label: "Косметика",
    routerLink: "/cosmetics",
    section: "navigation",
  },
  {
    label: "О центре",
    routerLink: "/about",
    section: "navigation",
  },
  {
    label: "Управление",
    routerLink: "/admin",
    roles: [1, 2, 3],
    section: "admin",
  },
];
