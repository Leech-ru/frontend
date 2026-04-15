import { User, UserRole, USERS_RESOURCE } from "@/entities/user";
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {
  TuiDropdownSheet,
  TuiResponsiveDialogService,
} from "@taiga-ui/addon-mobile";
import {
  TUI_TABLE_PAGINATION_TEXTS,
  TuiTablePagination,
  TuiTablePaginationEvent,
} from "@taiga-ui/addon-table";
import {
  TUI_BREAKPOINT,
  TuiButton,
  TuiCell,
  TuiDropdown,
  TuiHint,
  TuiIcon,
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
import {
  TuiBlockStatusComponent,
  TuiCardLarge,
  TuiHeader,
  TuiSearch,
} from "@taiga-ui/layout";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { AppAdminUsersEditUserFormComponent } from "../edit-user-form";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [
    ReactiveFormsModule,
    TuiAvatar,
    TuiBlockStatusComponent,
    TuiButton,
    TuiCardLarge,
    TuiCell,
    TuiChevron,
    TuiDataListWrapper,
    TuiDropdown,
    TuiDropdownSheet,
    TuiFade,
    TuiHeader,
    TuiHint,
    TuiIcon,
    TuiInput,
    TuiLoader,
    TuiSearch,
    TuiSelect,
    TuiTablePagination,
    TuiTextfield,
    TuiTitle,
  ],
  providers: [
    {
      provide: TUI_TABLE_PAGINATION_TEXTS,
      useValue: signal({
        linesPerPage: undefined,
        of: "из",
        pages: "Страниц",
      }),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminUsersPageComponent {
  protected readonly dialogs = inject(TuiResponsiveDialogService);
  protected readonly breakpoint = inject(TUI_BREAKPOINT);

  protected readonly usersResource = inject(USERS_RESOURCE);

  protected readonly users = linkedSignal<User[] | null, User[]>({
    source: () => this.usersResource.value(),
    computation: (next, previous) => next ?? previous?.value ?? [],
  });

  protected readonly loaded = signal(false);

  protected readonly form = new FormGroup({
    q: new FormControl(),
    role: new FormControl("Все роли"),
  });

  protected readonly items = ["Все роли", "Пользователь", "Админ"];

  constructor() {
    this.usersResource.reload();

    this.form.controls.q.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((searchValue) => {
        this.usersResource.params.offset.set(0);
        this.usersResource.params.q.set(searchValue || undefined);
      });

    this.form.controls.role.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((roleName) => {
        this.usersResource.params.offset.set(0);
        this.usersResource.params.role.set(this.mapRole(roleName));
      });

    effect(() => {
      if (this.usersResource.status() === "resolved") {
        this.loaded.set(true);
      }
    });
  }

  private mapRole(roleName: string | null | undefined): UserRole | undefined {
    if (roleName === "Админ") return 3;
    if (roleName === "Пользователь") return 0;
    return undefined;
  }

  protected resetFilters() {
    this.form.reset({ q: "", role: "Все роли" });
    this.usersResource.params.q.set(undefined);
    this.usersResource.params.role.set(this.mapRole("Все роли"));
    this.usersResource.params.limit.set(10);
    this.usersResource.params.offset.set(0);
  }

  protected handlePagination({ page, size }: TuiTablePaginationEvent): void {
    this.usersResource.params.limit.set(size);
    this.usersResource.params.offset.set(page * size);
  }

  protected editUser(user: User) {
    this.dialogs
      .open<User>(
        new PolymorpheusComponent(AppAdminUsersEditUserFormComponent),
        {
          label: "Редактирование пользователя",
          data: user,
        },
      )
      .subscribe();
  }
}
