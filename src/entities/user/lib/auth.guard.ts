import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { CanActivateFn, Router } from "@angular/router";
import { filter, map, take } from "rxjs";
import { UserStore } from "../store/user.store";

export const authGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  userStore.load();

  return toObservable(userStore.isLoading).pipe(
    filter((isLoading) => !isLoading),
    take(1),
    map(() => {
      const user = userStore.user();

      if (user && user.role > 0) {
        return router.createUrlTree(["/admin"]);
      }

      return true;
    }),
  );
};
