import { InjectionToken, inject, resource } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { UserService } from "../api/service";

export const USER_RESOURCE = new InjectionToken("User Resource", {
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
});
