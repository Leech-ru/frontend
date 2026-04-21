import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { TuiBadge } from "@taiga-ui/kit";
import { UserRole } from "../../api/types";

@Component({
  selector: "app-user-role-badge",
  templateUrl: "role-badge.html",
  styleUrl: "role-badge.less",
  imports: [TuiBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppUserRoleBadgeComponent {
  public readonly role = input.required<UserRole>();

  private static readonly ROLE_NAMES: Record<UserRole, string> = {
    0: $localize`Пользователь`,
    1: $localize`Модератор`,
    2: $localize`Админ`,
    3: $localize`Суперадмин`,
  };

  protected readonly roleDisplayName = computed(
    () => AppUserRoleBadgeComponent.ROLE_NAMES[this.role()],
  );

  protected readonly badgeAppearance = computed(() => {
    switch (this.role()) {
      case 0:
        return "info";
      case 1:
        return "positive";
      case 2:
        return "warning";
      case 3:
        return "negative";
    }
  });
}
