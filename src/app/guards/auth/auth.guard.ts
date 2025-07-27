import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { CanActivateFn, Router } from "@angular/router";
import { filter, map, take } from "rxjs";

import { UserStore } from "@/entities/user";

/**
 * Guard для блокировки доступа администраторов к публичным маршрутам.
 *
 * Выполняет следующие проверки:
 * 1. Запускает загрузку данных текущего пользователя из API
 * 2. Ожидает завершения загрузки (отслеживает signal isLoading)
 * 3. Проверяет наличие пользователя и его роль
 * 4. Определяет, является ли пользователь администратором (role > 0)
 *
 * Поведение при разных сценариях:
 * - Если пользователь является администратором → редирект на /admin и блокировка доступа
 * - Если пользователь не администратор или не авторизован → разрешает доступ к маршруту
 *
 * Использование: для защиты публичных страниц (логин, регистрация, главная)
 * от доступа администраторов, которые должны работать только в админ-панели.
 *
 * @returns Observable<boolean> - разрешение/запрет доступа к маршруту
 *
 * @see https://angular.dev/guide/routing/route-guards#route-guard-return-types
 */
export const authGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  userStore.load();

  // Превращаем signal в observable, чтобы отследить когда загрузка user завершится
  return toObservable(userStore.isLoading).pipe(
    filter((isLoading) => !isLoading),
    take(1),
    map(() => {
      const user = userStore.user();

      if (user && user.role > 0) {
        router.navigate(["/admin"]);
        return false;
      }

      return true;
    }),
  );
};
