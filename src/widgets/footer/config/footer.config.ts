import { FooterContent } from "../model/footer.model";

export const FOOTER_CONTENT: FooterContent = {
  sections: [
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
          routerLink: "/cosmetics/category",
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
  ],
  contacts: {
    tel: "+7 (495) 501-34-54",
    email: "leech-centre@mail.ru",
  },
};
