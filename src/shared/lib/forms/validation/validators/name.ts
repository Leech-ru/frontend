import { AbstractControl, Validators } from "@angular/forms";

export function nameValidator(control: AbstractControl): Validators | null {
  if (!control.value || typeof control.value !== "string") {
    return null;
  }

  const value = control.value.trim();
  const words = value.split(/\s+/).filter((word: string) => word.length > 0);

  if (words.length < 2 || words.length > 3) {
    return { invalidFullName: true };
  }

  return null;
}
