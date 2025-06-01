import { FormControl, FormGroup } from "@angular/forms";

export type ExtractFormGroupValue<T> =
  T extends FormGroup<infer V>
    ? { [K in keyof V]: ExtractFormGroupValue<V[K]> }
    : T extends FormControl<infer U>
      ? U
      : never;
