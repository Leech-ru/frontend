import { RoutePath } from "@/app/@x/route";

/**
 * Карточки на главной странице.
 */
export interface HomePageCard {
  /**
   * URL миниатюры изображения карточки.
   */
  thumbnail: string;

  /**
   * Заголовок карточки.
   */
  heading: string;

  /**
   * Описание карточки.
   */
  description: string;

  /**
   * Текст действия, которое будет выполнено при нажатии всей карточки.
   */
  action: string;

  /**
   * Путь для навигации при нажатии на карточку.
   */
  routerLink: RoutePath;

  /**
   * Опциональный параметр для указания, должна ли карточка занимать всю ширину.
   */
  fluid?: boolean | null | undefined;
}
