import {
  AppUserRoleBadgeComponent,
  User,
  UserRole,
  USERS_RESOURCE,
} from "@/entities/user";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TuiDropdownSheet } from "@taiga-ui/addon-mobile";
import {
  TuiCell,
  TuiDropdown,
  TuiInput,
  TuiLoader,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import {
  TuiAvatar,
  TuiChevron,
  TuiDataListWrapper,
  TuiFade,
  TuiSelect,
} from "@taiga-ui/kit";
import { TuiCardLarge, TuiHeader, TuiSearch } from "@taiga-ui/layout";
import { debounceTime, distinctUntilChanged } from "rxjs";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [
    AppUserRoleBadgeComponent,
    ReactiveFormsModule,
    TuiAvatar,
    TuiCardLarge,
    TuiCell,
    TuiChevron,
    TuiDataListWrapper,
    TuiDropdown,
    TuiDropdownSheet,
    TuiFade,
    TuiHeader,
    TuiInput,
    TuiLoader,
    TuiSearch,
    TuiSelect,
    TuiTextfield,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminUsersPageComponent {
  protected readonly usersResource = inject(USERS_RESOURCE);

  protected readonly users = linkedSignal<User[], User[]>({
    source: () => this.usersResource.value() ?? [],
    computation: (next, previous) =>
      next.length > 0 ? next : (previous?.value ?? []),
  });

  protected readonly form = new FormGroup({
    search: new FormControl(),
    role: new FormControl("Все роли"),
  });

  protected readonly items = ["Все роли", "Пользователь", "Админ"];

  constructor() {
    this.usersResource.reload();

    this.form.controls.search.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((searchValue) => {
        this.usersResource.params.search.set(searchValue || undefined);
      });

    this.form.controls.role.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((roleName) => {
        this.usersResource.params.role.set(this.mapRole(roleName));
      });
  }

  private mapRole(roleName: string | null | undefined): UserRole | undefined {
    if (roleName === "Админ") return 3;
    if (roleName === "Пользователь") return 0;
    return undefined;
  }
}
