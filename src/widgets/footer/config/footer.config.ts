import { FooterSection } from "../model/footer.model";

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "ПИЯВКИ",
    items: [
      {
        title: "Заказать пиявок",
        routerLink: "leech/buy",
      },
      {
        title: "О пиявках",
        routerLink: "leech/about",
      },
    ],
  },
  {
    title: "О НАС",
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
  {
    title: "КОНТАКТЫ",
    items: [
      {
        title: "+7 (495) 501-34-54",
        routerLink: "",
      },
      {
        title: "leech-centre@mail.ru",
        routerLink: "",
      },
    ],
  },
];
