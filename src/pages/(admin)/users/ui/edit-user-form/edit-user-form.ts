import {
  CURRENT_USER_RESOURCE,
  getRoleDisplayName,
  type User,
  USER_ROLES,
  USERS_RESOURCE,
  UserService,
} from "@/entities/user";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TuiDropdownSheet } from "@taiga-ui/addon-mobile";
import { TuiAutoFocus } from "@taiga-ui/cdk";
import {
  TuiButton,
  TuiDataList,
  TuiDialogContext,
  TuiDropdown,
  TuiError,
  TuiInput,
  TuiNotificationService,
  TuiTextfield,
} from "@taiga-ui/core";
import {
  TuiButtonLoading,
  TuiChevron,
  TuiDataListWrapper,
  TuiSelect,
  TuiStringifyContentPipe,
} from "@taiga-ui/kit";
import { TuiForm } from "@taiga-ui/layout";
import { injectContext } from "@taiga-ui/polymorpheus";
import { lastValueFrom } from "rxjs";

@Component({
  templateUrl: "./edit-user-form.html",
  styleUrl: "./edit-user-form.less",
  imports: [
    ReactiveFormsModule,
    TuiAutoFocus,
    TuiButton,
    TuiButtonLoading,
    TuiChevron,
    TuiDataList,
    TuiDataListWrapper,
    TuiDropdown,
    TuiDropdownSheet,
    TuiError,
    TuiForm,
    TuiInput,
    TuiSelect,
    TuiStringifyContentPipe,
    TuiTextfield,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminUsersEditUserFormComponent {
  private readonly userService = inject(UserService);
  private readonly usersResource = inject(USERS_RESOURCE);
  private readonly currentUserResource = inject(CURRENT_USER_RESOURCE);
  private readonly notifications = inject(TuiNotificationService);
  protected readonly context = injectContext<TuiDialogContext<User, User>>();
  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly roles = USER_ROLES;

  protected readonly isOwnProfile =
    this.context.data.id === this.currentUserResource.value()?.id;

  protected readonly form = new FormGroup({
    name: new FormControl(this.context.data.name, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    surname: new FormControl(this.context.data.surname, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl(this.context.data.email, {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    role: new FormControl(this.context.data.role, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected readonly getRoleDisplayName = getRoleDisplayName;

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      this.isLoading.set(true);

      const newUser = await lastValueFrom(
        this.userService.updateById(
          this.context.data.id,
          this.form.getRawValue(),
        ),
      );

      this.notifications
        .open<number>($localize`Пользователь отредактирован!`, {
          appearance: "positive",
          block: "end",
          inline: "end",
        })
        .subscribe();

      this.usersResource.reload();
      this.currentUserResource.reload();

      this.context.completeWith(newUser);
    } catch {
      this.error.set($localize`Произошла ошибка, попробуйте ещё раз`);
    } finally {
      this.isLoading.set(false);
    }
  }
}
