import {
  AppUserRoleBadgeComponent,
  getRoleDisplayName,
  USER_ROLES,
  USERS_RESOURCE,
  USERS_RESOURCE_PAGINATION_SIZES,
} from "@/entities/user";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { debounce, form, FormField, FormRoot } from "@angular/forms/signals";
import { TuiDropdownSheet } from "@taiga-ui/addon-mobile";
import { TuiTablePagination } from "@taiga-ui/addon-table";
import {
  TUI_BREAKPOINT,
  TuiButton,
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
  TuiInitialsPipe,
  TuiSelect,
  TuiStringifyContentPipe,
} from "@taiga-ui/kit";
import {
  TuiBlockStatusComponent,
  TuiCardLarge,
  TuiHeader,
  TuiSearch,
} from "@taiga-ui/layout";
import { EDIT_USER_FORM_DIALOG } from "../edit-user-form";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [
    AppUserRoleBadgeComponent,
    FormField,
    FormRoot,
    FormsModule,
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
    TuiInitialsPipe,
    TuiInput,
    TuiLoader,
    TuiSearch,
    TuiSelect,
    TuiStringifyContentPipe,
    TuiTablePagination,
    TuiTextfield,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminUsersPageComponent {
  protected readonly breakpoint = inject(TUI_BREAKPOINT);
  protected readonly usersResource = inject(USERS_RESOURCE);
  protected readonly editUserFormDialog = inject(EDIT_USER_FORM_DIALOG);

  protected readonly sizes = USERS_RESOURCE_PAGINATION_SIZES;
  protected readonly roles = USER_ROLES;
  protected readonly getRoleDisplayName = getRoleDisplayName;

  protected readonly form = form(this.usersResource.filters, (schema) => {
    debounce(schema.q, 400);
  });

  constructor() {
    this.usersResource.reset();
    this.usersResource.reload();
  }
}
