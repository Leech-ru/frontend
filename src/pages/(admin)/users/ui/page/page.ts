import {
  AppUserRoleBadgeComponent,
  User,
  USER_ROLES,
  UserRole,
  USERS_RESOURCE,
  UsersPagination,
} from "@/entities/user";
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal,
  signal,
} from "@angular/core";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
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
  TuiDialogService,
  TuiDropdown,
  TuiInput,
  TuiLoader,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import {
  TuiAvatar,
  TuiChevron,
  TuiConfirmService,
  TuiDataListWrapper,
  TuiFade,
  TuiSelect,
  TuiStringifyContentPipe,
} from "@taiga-ui/kit";
import {
  TuiBlockStatusComponent,
  TuiCardLarge,
  TuiHeader,
  TuiSearch,
} from "@taiga-ui/layout";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { debounceTime, distinctUntilChanged, map, of, switchMap } from "rxjs";
import {
  AppAdminUsersEditUserFormComponent,
  EDIT_USER_FORM_STATE,
} from "../edit-user-form";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [
    AppUserRoleBadgeComponent,
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
    TuiInput,
    TuiLoader,
    TuiSearch,
    TuiSelect,
    TuiStringifyContentPipe,
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
    TuiConfirmService,
    {
      provide: TuiDialogService,
      useExisting: TuiResponsiveDialogService,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminUsersPageComponent {
  protected readonly dialogs = inject(TuiResponsiveDialogService);
  protected readonly breakpoint = inject(TUI_BREAKPOINT);
  protected readonly editUserFormState = inject(EDIT_USER_FORM_STATE);
  protected readonly confirm = inject(TuiConfirmService);
  protected readonly editUserFormClosable = toObservable(
    this.editUserFormState.isLoading,
  ).pipe(map((loading) => !loading));

  protected readonly usersResource = inject(USERS_RESOURCE);

  protected readonly users = linkedSignal<
    UsersPagination | null,
    UsersPagination
  >({
    source: () => this.usersResource.value(),
    computation: (next, previous) =>
      next ??
      previous?.value ?? {
        items: [],
        pagination: {
          current_page: 0,
          has_next: false,
          has_previous: false,
          total_items: 0,
          total_pages: 0,
        },
      },
  });

  protected readonly loaded = signal(false);

  protected readonly form = new FormGroup({
    q: new FormControl(),
    role: new FormControl(null),
  });

  protected readonly roles = USER_ROLES;

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
      .subscribe((role) => {
        this.usersResource.params.offset.set(0);
        this.usersResource.params.role.set(role ?? undefined);
      });

    effect(() => {
      if (this.usersResource.status() === "resolved") {
        this.loaded.set(true);
      }
    });

    effect(() => {
      if (this.editUserFormState.touched()) {
        this.confirm.markAsDirty();
      }
    });
  }

  private static readonly ROLE_NAMES: Record<UserRole, string> = {
    0: "Пользователь",
    1: "Модератор",
    2: "Админ",
    3: "Суперадмин",
  };

  protected readonly stringifyRole = (role: UserRole): string =>
    AppAdminUsersPageComponent.ROLE_NAMES[role];

  protected resetFilters() {
    this.form.reset({ q: "", role: null });
    this.usersResource.params.q.set(undefined);
    this.usersResource.params.role.set(undefined);
    this.usersResource.params.offset.set(0);
  }

  protected handlePagination({ page, size }: TuiTablePaginationEvent): void {
    this.usersResource.params.limit.set(size);
    this.usersResource.params.offset.set(page * size);
  }

  protected editUser(user: User) {
    const confirm = this.confirm.withConfirm({
      label: "Закрыть окно?",
      data: { content: "Ваши изменения будут потеряны", yes: "Да", no: "Нет" },
    });

    const closable = this.editUserFormClosable.pipe(
      switchMap((closable) => (closable ? confirm : of(false))),
    );

    this.dialogs
      .open<User>(
        new PolymorpheusComponent(AppAdminUsersEditUserFormComponent),
        {
          label: "Редактирование пользователя",
          data: user,
          closable,
          dismissible: closable,
        },
      )
      .subscribe({
        complete: () => {
          this.confirm.markAsPristine();
          this.editUserFormState.touched.set(false);
        },
      });
  }
}
