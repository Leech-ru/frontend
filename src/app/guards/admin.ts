import { CURRENT_USER_RESOURCE } from "@/entities/user";
import { isPlatformServer } from "@angular/common";
import { computed, inject, PLATFORM_ID } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { CanActivateFn, Router } from "@angular/router";
import { filter, map, take } from "rxjs";

export const adminGuard: CanActivateFn = () => {
  const currentUserResource = inject(CURRENT_USER_RESOURCE);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const isServer = computed(() => isPlatformServer(platformId));

  if (isServer()) {
    return true;
  }

  return toObservable(currentUserResource.isLoading).pipe(
    filter((loading) => !loading),
    take(1),
    map(() => currentUserResource.value()),
    map((currentUser) => {
      if (!currentUser) {
        return router.createUrlTree(["/login"]);
      }
      return currentUser.role > 0 || router.createUrlTree(["/"]);
    }),
  );
};
