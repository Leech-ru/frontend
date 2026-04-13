import { InjectionToken, inject, resource, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { UserService } from "../service";
import { UserRole } from "../types";

export const USERS_RESOURCE = new InjectionToken("Users Resource", {
  providedIn: "root",
  factory: () => {
    const userService = inject(UserService);

    const search = signal<string | undefined>(undefined);
    const role = signal<UserRole | undefined>(undefined);

    return Object.assign(
      resource({
        params: () => ({ search: search(), role: role() }),
        loader: async ({ params }) => {
          try {
            return await lastValueFrom(userService.getAll(params));
          } catch {
            return null;
          }
        },
      }),
      { params: { search, role } },
    );
  },
});
