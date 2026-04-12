import { USER_RESOURCE } from "@/entities/user";
import { LogoutService } from "@/features/(auth)/logout";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  output,
  signal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiDropdownSheet } from "@taiga-ui/addon-mobile";
import { TuiActiveZone, TuiObscured } from "@taiga-ui/cdk";
import { TuiDataList, TuiDropdown, TuiTitle } from "@taiga-ui/core";
import { TuiAvatar, TuiBadge, TuiFade, TuiInitialsPipe } from "@taiga-ui/kit";
import { AppHeaderDrawerComponent } from "../drawer";
import { AppHeaderLogoComponent } from "../logo";
import { AppHeaderNavigationComponent } from "../navigation";
import { AppHeaderNavigationItemComponent } from "../navigation/item";

@Component({
  selector: "sheet-spy",
  template: "",
})
export class SheetSpy implements OnDestroy {
  public readonly destroyed = output<void>();

  ngOnDestroy() {
    this.destroyed.emit();
  }
}

@Component({
  selector: "app-header",
  templateUrl: "header.html",
  styleUrl: "header.less",
  imports: [
    AppHeaderDrawerComponent,
    AppHeaderLogoComponent,
    AppHeaderNavigationComponent,
    AppHeaderNavigationItemComponent,
    SheetSpy,
    RouterLink,
    TuiActiveZone,
    TuiAvatar,
    TuiBadge,
    TuiDataList,
    TuiDropdown,
    TuiDropdownSheet,
    TuiFade,
    TuiInitialsPipe,
    TuiObscured,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  protected readonly logoutService = inject(LogoutService);
  protected readonly userResource = inject(USER_RESOURCE);
  protected readonly userDropdownOpen = signal(false);
}
