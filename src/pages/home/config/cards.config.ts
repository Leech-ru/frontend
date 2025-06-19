import { HomePageCard } from "../model/cards.model";

export const HOME_PAGE_CARDS: HomePageCard[] = [
  {
    thumbnail: "/assets/medical-leech-wholesale.jpg",
    heading: "Медицинская пиявка оптом",
    description:
      "Выращенная в искусственно созданных условиях медицинская пиявка (Hirudo medicinalis)",
    action: "Оформить заказ",
    routerLink: "/leech/buy",
    fluid: true,
  },
  {
    thumbnail: "/assets/cosmetic-catalog.jpg",
    heading: "Каталог косметики",
    description:
      "Косметические средства линии BAA содержат секрет слюнных желез медицинских пиявок, полученный ручным способом",
    action: "Посмотреть",
    routerLink: "/cosmetic/category",
  },
  {
    thumbnail: "/assets/about-our-center.jpg",
    heading: "О нашем центре",
    description:
      "Обеспечиваем высокое качество продукции круглый год, в наличии любое количество пиявки выращенное в искусственно созданных условиях",
    action: "Читать подробнее",
    routerLink: "/about",
  },
];
