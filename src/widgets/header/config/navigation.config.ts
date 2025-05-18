import { NavigationItem } from "../model/navigation.model";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "Главная",
    routerLink: "",
  },
  {
    label: "Пиявки",
    routerLink: "leech",
    children: [
      {
        label: "Заказать пиявок",
        routerLink: "leech/buy",
      },
      {
        label: "О пиявках",
        routerLink: "leech/about",
      },
    ],
  },
  {
    label: "Косметика",
    routerLink: "cosmetics",
    children: [
      {
        label: "Каталог косметики",
        routerLink: "cosmetics/catalog",
      },
      {
        label: "Где купить косметику?",
        routerLink: "cosmetics/buy",
      },
    ],
  },
  {
    label: "Контакты",
    routerLink: "contact",
  },
  {
    label: "О центре",
    routerLink: "about",
  },
];
