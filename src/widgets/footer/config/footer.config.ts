import { FooterSection } from "../model/footer.model";

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Пиявки",
    items: [
      {
        title: "Заказать пиявок",
        routerLink: "/leech/buy",
      },
      {
        title: "О пиявках",
        routerLink: "/leech/about",
      },
    ],
  },
  {
    title: "Косметика",
    items: [
      {
        title: "Каталог косметики",
        routerLink: "/cosmetics/catalog",
      },
      {
        title: "Где купить косметику?",
        routerLink: "/cosmetics/buy",
      },
    ],
  },
  {
    title: "О нас",
    items: [
      {
        title: "Информация",
        routerLink: "/about",
      },
      {
        title: "Экскурсии",
        routerLink: "/",
      },
    ],
  },
  {
    title: "Контакты",
    items: [
      {
        title: "+7 (495) 501-34-54",
        routerLink: "/",
      },
      {
        title: "leech-centre@mail.ru",
        routerLink: "/",
      },
    ],
  },
];
