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

  protected readonly roleDisplayName = computed(() =>
    this.role() === 0 ? "Пользователь" : "Админ",
  );

  protected readonly badgeAppearance = computed(() =>
    this.role() === 0 ? "" : "primary",
  );
}
