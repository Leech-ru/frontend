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

  /**
   * Цвет иконки упаковки.
   *
   * @example "var(--tui-background-base)"
   */
  color: string;

  /**
   * Фоновый цвет иконки упаковки.
   *
   * @example "var(--tui-chart-categorical-00)"
   */
  background: string;
};

export type TuiStepperStepState = "normal" | "error" | "pass";
