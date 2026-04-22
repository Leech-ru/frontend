import { UserRole } from "../api/types";

export const USER_ROLES = [0, 1, 2, 3] as const;

export const USER_ROLES_NAMES: Record<UserRole, string> = {
  0: $localize`Пользователь`,
  1: $localize`Модератор`,
  2: $localize`Админ`,
  3: $localize`Суперадмин`,
};
