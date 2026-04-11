import { HomePageCard } from "../model/cards.model";

export const HOME_PAGE_CARDS: HomePageCard[] = [
  {
    thumbnail: "https://leech.ru/upload/news/en/0_46061100_1267816724.jpg",
    heading: "Медицинская пиявка оптом",
    description:
      "Выращенная в искусственно созданных условиях медицинская пиявка (Hirudo medicinalis)",
    action: "К пиявкам",
    routerLink: "/leech",
    fluid: true,
  },
  {
    thumbnail: "https://leech.ru/upload/news/en/0_72767700_1267998281.jpg",
    heading: "Каталог косметики",
    description:
      "Косметические средства линии BAA содержат секрет слюнных желез медицинских пиявок, полученный ручным способом",
    action: "Посмотреть",
    routerLink: "/cosmetics",
  },
  {
    thumbnail: "https://leech.ru/userfiles/O-centre78-b.jpg",
    heading: "О нашем центре",
    description:
      "Обеспечиваем высокое качество продукции круглый год, в наличии любое количество пиявки выращенное в искусственно созданных условиях",
    action: "Читать подробнее",
    routerLink: "/about",
  },
];
