import { InjectionToken, inject, resource } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { UserService } from "../service";

export const CURRENT_USER_RESOURCE = new InjectionToken(
  "Current User Resource",
  {
    providedIn: "root",
    factory: () => {
      const userService = inject(UserService);

      return resource({
        loader: async () => {
          try {
            return await lastValueFrom(userService.get());
          } catch {
            return null;
          }
        },
      });
    },
  },
);
