import { AbstractControl } from "@angular/forms";

export interface FormStepBase {
  title: string;
  description: string;
  control?: AbstractControl;
}

export interface FormStepNavigation {
  back: VoidFunction | (() => Promise<unknown>);
  next: VoidFunction | (() => Promise<unknown>);
}

export interface FormStepArgs
  extends FormStepBase, Partial<FormStepNavigation> {}

export interface FormStep extends FormStepBase, FormStepNavigation {
  disabled: boolean;
  state: "normal" | "pass" | "error";
  dependencies: AbstractControl[];
}
