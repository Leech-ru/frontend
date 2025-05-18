import { RoutePath } from "@/app/@x/route";

/**
 * Элемент секции
 */
export interface FooterItem {
  /**
   * Название элемента секции (❁´◡`❁)
   */
  title: string;

  /**
   * Ссылка(маршрут) при нажатии на элемент, которая есть не у всех элементов
   */
  routerLink?: RoutePath;
}

/**
 * Секция в футере.
 */
export interface FooterSection {
  /**
   * Название секции
   */
  title: string;

  /**
   * Элементы секции
   */
  items: FooterItem[];
}

export interface FooterContacts {
  /**
   * Название контакта
   */
  title: string;

  /**
   * Иконка контакта (мессенджера/площадки)
   */
  icon: string;

  /**
   * Ссылка, которая откроется при нажатии на контакт
   */
  link: string;
}
