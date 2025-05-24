import { AbstractControl, ValidatorFn } from "@angular/forms";

import { ErrorMessage } from "./types";

export const createValidator = (
  validate: ValidatorFn,
  message?: ErrorMessage,
) => {
  return (control: AbstractControl) => {
    const errors = validate(control);
    if (!message) {
      return errors;
    }
    if (errors) {
      return {
        message: typeof message === "function" ? message(errors) : message,
      };
    }
    return null;
  };
};
