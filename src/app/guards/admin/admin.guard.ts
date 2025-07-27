import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { CanActivateFn, Router } from "@angular/router";
import { filter, map, take } from "rxjs";

import { UserStore } from "@/entities/user";

/**
 * Guard для защиты административных маршрутов.
 *
 * Выполняет следующие проверки:
 * 1. Запускает загрузку данных текущего пользователя из API
 * 2. Ожидает завершения загрузки (отслеживает signal isLoading)
 * 3. Проверяет успешность загрузки и наличие пользователя
 * 4. Проверяет права администратора
 *
 * Поведение при разных сценариях:
 * - Если ошибка загрузки или пользователь не найден → редирект на /login
 * - Если пользователь не админ → редирект на главную
 * - Если все проверки пройдены → разрешает доступ к маршруту
 *
 * @returns Observable<boolean> - разрешение/запрет доступа к маршруту
 *
 * @see https://angular.dev/guide/routing/route-guards#route-guard-return-types
 */
export const adminGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  userStore.load();

  // Превращаем signal в observable, чтобы отследить когда загрузка user завершится
  return toObservable(userStore.isLoading).pipe(
    filter((isLoading) => !isLoading),
    take(1),
    map(() => {
      const user = userStore.user();
      const error = userStore.error();

      if (error) {
        router.navigate(["/login"]);
        return false;
      }

      if (!user) {
        router.navigate(["/login"]);
        return false;
      }

      return user.role !== 0;
    }),
  );
};
