import { User } from "@/entities/user";
import { inject, InjectionToken } from "@angular/core";
import { TuiResponsiveDialogService } from "@taiga-ui/addon-mobile";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { AppAdminUsersEditUserFormComponent } from "./edit-user-form";

export const EDIT_USER_FORM_DIALOG = new InjectionToken(
  "Edit User Form Dialog",
  {
    factory: () => {
      const dialogs = inject(TuiResponsiveDialogService);

      return {
        open: (user: User) => {
          dialogs
            .open<User>(
              new PolymorpheusComponent(AppAdminUsersEditUserFormComponent),
              {
                label: $localize`Редактирование пользователя`,
                data: user,
              },
            )
            .subscribe();
        },
      };
    },
  },
);
