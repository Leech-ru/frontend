import { FooterContent } from "../model/footer.model";

export const FOOTER_CONTENT: FooterContent = {
  sections: [
    {
      title: $localize`Пиявки`,
      items: [
        {
          title: $localize`Заказать пиявок`,
          routerLink: "/leech/order",
        },
        {
          title: $localize`О пиявках`,
          routerLink: "/leech/about",
        },
      ],
    },
    {
      title: $localize`Косметика`,
      items: [
        {
          title: $localize`Каталог косметики`,
          routerLink: "/cosmetics",
        },
        {
          title: $localize`Где купить косметику?`,
          routerLink: "/cosmetics/buy",
        },
      ],
    },
    {
      title: $localize`О нас`,
      items: [
        {
          title: $localize`Информация`,
          routerLink: "/about",
        },
        {
          title: $localize`Экскурсии`,
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
