import { InjectionToken, signal } from "@angular/core";

export const EDIT_USER_FORM_STATE = new InjectionToken("Edit User Form State", {
  providedIn: "root",
  factory: () => ({
    error: signal<string | null>(null),
    isLoading: signal(false),
    touched: signal(false),
  }),
});
