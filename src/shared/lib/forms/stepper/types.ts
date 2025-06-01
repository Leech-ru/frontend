import { AbstractControl } from "@angular/forms";

/**
 * Общие параметры, используемые в шагах степпера.
 */
export interface FormStepBase {
  /**
   * Заголовок шага, отображаемый пользователю.
   */
  title: string;

  /**
   * Описание шага, предоставляющее дополнительную информацию о его содержимом.
   */
  description: string;

  /**
   * Контроль формы, связанный с этим шагом, который управляет состоянием и валидацией.
   */
  control?: AbstractControl;
}

/**
 * Навигационные функции для управления переходами между шагами.
 */
export interface FormStepNavigation {
  /**
   * Функция, вызываемая при возврате к предыдущему шагу.
   */
  back: VoidFunction | (() => Promise<unknown>);

  /**
   * Функция, вызываемая после завершения шага.
   */
  next: VoidFunction | (() => Promise<unknown>);
}

/**
 * Параметры, необходимые для создания шага в степпере.
 */
export interface FormStepArgs
  extends FormStepBase,
    Partial<FormStepNavigation> {
  /**
   * Этикетка для кнопки назад или функция, возвращающая строку.
   */
  backLabel: string | (() => string);

  /**
   * Этикетка для кнопки далее или функция, возвращающая строку.
   */
  nextLabel: string | (() => string);
}

/**
 * Представляет шаг в степпере с публичным интерфейсом.
 */
export interface FormStep extends FormStepBase, FormStepNavigation {
  /**
   * Этикетка для кнопки далее.
   */
  nextLabel: string;

  /**
   * Этикетка для кнопки назад.
   */
  backLabel: string;

  /**
   * Указывает, отключён ли шаг (например, если есть незавершённые зависимости)
   */
  disabled: boolean;

  /**
   * Текущее состояние шага.
   *
   * Полезно для интеграции с `TuiStepper`.
   *
   * @see https://taiga-ui.dev/navigation/stepper
   */
  state: "normal" | "pass" | "error";

  /**
   * Зависимости этого шага, предыдущие другие контроли формы, которые влияют на его состояние.
   */
  dependencies: AbstractControl[];
}
