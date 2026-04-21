import type { ContactService } from "@/entities/info";
export type { ContactService, ContactServiceLink } from "@/entities/info";

export const BUY_CONTACTS: ContactService[] = [
  {
    icon: "@tui.scroll-text",
    heading: $localize`Международный Центр Пиявки`,
    description: $localize`Московская область, г. Раменское, д.п. Удельная, ул. Октябрьская, 40`,
    links: [
      {
        label: "(495) 744-26-50",
        href: "tel:(495) 744-26-50",
      },
      {
        label: "(901) 574-82-33",
        href: "tel:(901) 574-82-33",
      },
      {
        label: "(901) 574-82-33",
        href: "tel:(901) 574-82-33",
      },
      {
        label: "leechkom@mail.ru",
        href: "mailto:leechkom@mail.ru",
      },
    ],
    fluid: true,
  },
  {
    icon: "@tui.info",
    heading: $localize`ООО «Аптечный край»`,
    description: $localize`г. Москва, ул. Дм. Ульянова д. 24`,
    links: [
      {
        label: "+7-963-932-50-83",
        href: "tel:+7-963-932-50-83",
      },
    ],
  },
  {
    icon: "@tui.info",
    heading: $localize`Медтехно.ру`,
    description: $localize`г. Москва, ул. Краснодонская, 39`,
    links: [
      {
        label: "+7-495-255-78-00",
        href: "tel:+7-495-255-78-00",
      },
      {
        label: $localize`Сайт`,
        href: "https://www.medtehno.ru/contacts/#shops",
      },
    ],
  },
  {
    icon: "@tui.info",
    heading: $localize`ООО «Юнитек»`,
    description: $localize`656066, г. Барнаул, ул. Малахова 177е`,
    links: [
      {
        label: "+7-495-255-78-00",
        href: "tel:+7-495-255-78-00",
      },
    ],
  },
  {
    icon: "@tui.info",
    heading: $localize`ИП Сафронов Кирилл Сергеевич`,
    description: $localize`Доступно на ozon и wildberries`,
    links: [
      {
        label: "OZON Dr.Nikonov",
        href: "https://www.ozon.ru/brand/dr-nikonov-100078993/",
      },
      {
        label: "WILDBERRIES Dr.Nikonov",
        href: "https://www.wildberries.ru/brands/dr-nikonov",
      },
    ],
  },
];
