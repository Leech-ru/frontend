import { FormGroup } from "@angular/forms";

export const markValidControlsAsTouched = (formGroup: FormGroup): void => {
  Object.keys(formGroup.controls).forEach((controlName) => {
    const control = formGroup.get(controlName);
    if (control?.valid) {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        markValidControlsAsTouched(control);
      }
    }
  });
};
