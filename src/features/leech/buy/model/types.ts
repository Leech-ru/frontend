export type LeechBuyPackage = {
  /**
   * Уникальный идентификатор упаковки с пиявками.
   */
  id: number;

  /**
   * Иконка упаковки.
   */
  icon: string;

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
