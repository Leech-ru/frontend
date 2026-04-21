import { NavigationItem } from "../model/navigation.model";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: $localize`Главная`,
    routerLink: "/",
    section: "navigation",
  },
  {
    label: $localize`Пиявки`,
    routerLink: "/leech",
    section: "navigation",
  },
  {
    label: $localize`Косметика`,
    routerLink: "/cosmetics",
    section: "navigation",
  },
  {
    label: $localize`О центре`,
    routerLink: "/about",
    section: "navigation",
  },
  {
    label: $localize`Управление`,
    routerLink: "/admin",
    roles: [1, 2, 3],
    section: "admin",
  },
];
