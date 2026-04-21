import { ContactService } from "../../../entities/info/model/contact.model";

export const CONTACT_SERVICES: ContactService[] = [
  {
    icon: "@tui.phone",
    heading: $localize`Будем на связи`,
    links: [
      {
        label: "+7 (495) 501-34-54",
        href: "tel:+74955013454",
      },
      {
        label: "leech-centre@mail.ru",
        href: "mailto:leech-centre@mail.ru",
      },
    ],
    description: $localize`Мы ответим на ваши звонки и письма с понедельника по пятницу с 08:30 до 17:00`,
    fluid: true,
  },
  {
    icon: "@tui.clock",
    heading: $localize`Время работы киосков`,
    schedule: [
      {
        days: [
          $localize`Понедельник`,
          $localize`Вторник`,
          $localize`Среда`,
          $localize`Четверг`,
          $localize`Пятница`,
        ],
        hours: { open: "08:00", close: "19:00" },
      },
      {
        days: [$localize`Суббота`, $localize`Воскресенье`],
        hours: { open: "09:00", close: "17:00" },
      },
    ],
    description: $localize`Киоски работают без перерыва на обед`,
  },
  {
    icon: "@tui.users",
    heading: $localize`Обслуживание юр. лиц`,
    schedule: [
      {
        days: [
          $localize`Понедельник`,
          $localize`Вторник`,
          $localize`Среда`,
          $localize`Четверг`,
          $localize`Пятница`,
        ],
        hours: { open: "08:30", close: "17:00" },
      },
    ],
    description: $localize`Обслуживание юридических лиц без перерыва на обед`,
  },
];
