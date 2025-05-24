import { ValidationErrors } from "@angular/forms";

export type ErrorMessage =
  | ((errors: ValidationErrors) => string)
  | string
  | null
  | undefined;
