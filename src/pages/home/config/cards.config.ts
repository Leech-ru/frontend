import { HomePageCard } from "../model/cards.model";

export const HOME_PAGE_CARDS: HomePageCard[] = [
  {
    thumbnail: "https://leech.ru/upload/news/en/0_46061100_1267816724.jpg",
    heading: $localize`Медицинская пиявка оптом`,
    description: $localize`Выращенная в искусственно созданных условиях медицинская пиявка (Hirudo medicinalis)`,
    action: $localize`О пиявке`,
    routerLink: "/leech",
    fluid: true,
  },
  {
    thumbnail: "https://leech.ru/upload/news/en/0_72767700_1267998281.jpg",
    heading: $localize`Каталог косметики`,
    description: $localize`Косметические средства линии BAA содержат секрет слюнных желез медицинских пиявок, полученный ручным способом`,
    action: $localize`Посмотреть`,
    routerLink: "/cosmetics",
  },
  {
    thumbnail: "https://leech.ru/userfiles/O-centre78-b.jpg",
    heading: $localize`О нашем центре`,
    description: $localize`Обеспечиваем высокое качество продукции круглый год, в наличии любое количество пиявки выращенное в искусственно созданных условиях`,
    action: $localize`Читать подробнее`,
    routerLink: "/about",
  },
];
