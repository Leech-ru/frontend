/**
 * Интерфейс для представления расписания службы контакта.
 */
export interface ContactServiceLink {
  /**
   * Этикетка ссылки.
   */
  label: string;

  /**
   * URL ссылки.
   */
  href: string;
}

/**
 * Интерфейс для представления расписания службы контакта.
 */
export interface ContactServiceSchedule {
  /**
   * Массив дней.
   *
   * @example ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"]
   */
  days: string[];

  /**
   * Время работы.
   *
   * @example { open: "08:00", close: "19:00" }
   */
  hours: {
    /**
     * Время открытия.
     */
    open: string;

    /**
     * Время закрытия.
     */
    close: string;
  };
}

/**
 * Служба для контакта, например "Время работы киосков" или "Обслуживание юр. лиц".
 */
export interface ContactService {
  /**
   * Иконка службы.
   *
   * @example "@tui.clock"
   */
  icon: string;

  /**
   * Заголовок службы.
   */
  heading: string;

  /**
   * Опциональный массив расписаний службы.
   */
  schedule?: ContactServiceSchedule[];

  /**
   * Опциональный массив ссылок службы.
   */
  links?: ContactServiceLink[];

  /**
   * Произвольное описание службы.
   */
  description: string;

  /**
   * Опциональный параметр для указания, должна ли карточка занимать всю ширину.
   */
  fluid?: boolean | null | undefined;
}
