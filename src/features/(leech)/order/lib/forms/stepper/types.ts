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
  extends FormStepBase, Partial<FormStepNavigation> {
  backLabel: string | (() => string);
  nextLabel: string | (() => string);
}

export interface FormStep extends FormStepBase, FormStepNavigation {
  nextLabel: string;
  backLabel: string;
  disabled: boolean;
  state: "normal" | "pass" | "error";
  dependencies: AbstractControl[];
}
