import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { CanActivateFn, Router } from "@angular/router";
import { filter, map, take } from "rxjs";
import { UserStore } from "../store/user.store";

export const adminGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  userStore.load();

  return toObservable(userStore.isLoading).pipe(
    filter((isLoading) => !isLoading),
    take(1),
    map(() => {
      const user = userStore.user();
      const error = userStore.error();

      if (error || !user) {
        return router.createUrlTree(["/login"]);
      }

      return user.role !== 0;
    }),
  );
};
