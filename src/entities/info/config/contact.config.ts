import { ContactService } from "../model/contact.model";

export const CONTACT_SERVICES: ContactService[] = [
  {
    icon: "@tui.phone",
    heading: "Будем на связи",
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
    description:
      "Мы ответим на ваши звонки и письма с понедельника по пятницу с 08:30 до 17:00",
    fluid: true,
  },
  {
    icon: "@tui.clock",
    heading: "Время работы киосков",
    schedule: [
      {
        days: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"],
        hours: { open: "08:00", close: "19:00" },
      },
      {
        days: ["Суббота", "Воскресенье"],
        hours: { open: "09:00", close: "17:00" },
      },
    ],
    description: "Киоски работают без перерыва на обед",
  },
  {
    icon: "@tui.users",
    heading: "Обслуживание юр. лиц",
    schedule: [
      {
        days: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"],
        hours: { open: "08:30", close: "17:00" },
      },
    ],
    description: "Обслуживание юридических лиц без перерыва на обед",
  },
];
