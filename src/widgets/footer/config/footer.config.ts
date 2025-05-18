import { FooterSection } from "../model/footer.model";

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Пиявки",
    items: [
      {
        title: "Заказать пиявок",
        routerLink: "leech/buy",
      },
      {
        title: "О пиявках",
        routerLink: "leech/about",
      },
      {
        title: "Косметика",
        routerLink: "cosmetics",
      },
    ],
  },
  {
    title: "О нас",
    items: [
      {
        title: "Информация",
        routerLink: "about",
      },
      {
        title: "Экскурсии",
        routerLink: "",
      },
    ],
  },
];
