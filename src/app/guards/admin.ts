import { USER_RESOURCE } from "@/entities/user";
import { isPlatformServer } from "@angular/common";
import { computed, inject, PLATFORM_ID } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { CanActivateFn, Router } from "@angular/router";
import { filter, map, take } from "rxjs";

export const adminGuard: CanActivateFn = () => {
  const userResource = inject(USER_RESOURCE);
  const router = inject(Router);
  const platform = inject(PLATFORM_ID);
  const isServer = computed(() => isPlatformServer(platform));

  if (isServer()) {
    return true;
  }

  return toObservable(userResource.isLoading).pipe(
    filter((loading) => !loading),
    take(1),
    map(() => userResource.value()),
    map((user) => {
      if (!user) {
        return router.createUrlTree(["/login"]);
      }
      return user.role > 0 || router.createUrlTree(["/"]);
    }),
  );
};
