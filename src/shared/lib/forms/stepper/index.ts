import { signal } from "@angular/core";

import { Step, StepArgs, StepNavigation } from "./types";

/**
 *
 */
export class Stepper implements StepNavigation {
  /**
   * Массив шагов, представляющих последовательность шагов в степпере.
   */
  public readonly steps: Step[];

  /**
   * Индекс текущего шага, управляемый с помощью сигнала.
   */
  public readonly index = signal<number>(0);

  /**
   * Создаёт экземпляр `Stepper` с заданными шагами.
   *
   * @param steps Конфигурационный массив шагов, используемых для инициализации степпера.
   */
  constructor(steps: StepArgs[]) {
    this.steps = steps.map(({ nextLabel, backLabel, ...step }, i) => ({
      ...step,
      next: () => this.next,
      back: () => this.back,
      get nextLabel() {
        return typeof nextLabel === "function" ? nextLabel() : nextLabel;
      },
      get backLabel() {
        return typeof backLabel === "function" ? backLabel() : backLabel;
      },
      get disabled() {
        return this.dependencies.some(({ invalid }) => invalid);
      },
      get state() {
        return step.control.touched
          ? step.control.invalid
            ? "error"
            : "pass"
          : "normal";
      },
      dependencies: steps.slice(0, i).map(({ control }) => control),
    }));
  }

  /**
   * Текущий шаг степпера.
   */
  public get step(): Step {
    return this.steps[this.index()];
  }

  /**
   * Переходит к предыдущему шагу степпера, если это возможно.
   */
  public back(): void {
    this.index.update((prev) => Math.max(prev - 1, 0));
  }

  /**
   * Переходит к следующему шагу степпера, если это возможно.
   */
  public next(): void {
    this.index.update((prev) => Math.min(prev + 1, this.steps.length - 1));
  }
}
