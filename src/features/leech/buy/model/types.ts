export type LeechPackage = {
  /**
   * Уникальный идентификатор для сравнивания упаковок с пиявками.
   */
  id: number;

  /**
   * Название упаковки для пиявок.
   */
  name: string;

  /**
   * Описание упаковки с пиявками.
   */
  description: string;
};

export type TuiStepperStepState = "normal" | "error" | "pass";
