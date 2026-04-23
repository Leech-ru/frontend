import { signal } from "@angular/core";
import { FormStep, FormStepArgs, FormStepNavigation } from "./types";

export class FormStepper implements FormStepNavigation {
  public readonly steps: FormStep[];

  public readonly index = signal<number>(0);

  public constructor(steps: FormStepArgs[]) {
    this.steps = steps.map((step, i) => ({
      next: () => this.next(),
      back: () => this.back(),
      get disabled() {
        return this.dependencies.some(({ invalid }) => invalid);
      },
      get state() {
        return step.control?.touched
          ? step.control.invalid
            ? "error"
            : "pass"
          : "normal";
      },
      dependencies: steps
        .slice(0, i)
        .map(({ control }) => control)
        .filter((control) => control !== undefined),
      ...step,
    }));
  }

  public get step(): FormStep {
    return this.steps[this.index()];
  }

  public back(): void {
    this.index.update((prev) => Math.max(prev - 1, 0));
  }

  public next(): void {
    this.index.update((prev) => Math.min(prev + 1, this.steps.length - 1));
  }
}
