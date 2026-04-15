import { InjectionToken, inject, resource, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { UserService } from "../service";
import { UserRole } from "../types";

export const USERS_RESOURCE = new InjectionToken("Users Resource", {
  providedIn: "root",
  factory: () => {
    const userService = inject(UserService);

    const q = signal<string | undefined>(undefined);
    const role = signal<UserRole | undefined>(undefined);
    const limit = signal(10);
    const offset = signal(0);

    return Object.assign(
      resource({
        params: () => ({
          q: q(),
          role: role(),
          limit: limit(),
          offset: offset(),
        }),
        loader: async ({ params }) => {
          try {
            return (await lastValueFrom(userService.getAll(params))) ?? [];
          } catch {
            return null;
          }
        },
        defaultValue: null,
      }),
      { params: { q, role, limit, offset } },
    );
  },
});
