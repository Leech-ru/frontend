import {
  AppUserRoleBadgeComponent,
  CURRENT_USER_RESOURCE,
} from "@/entities/user";
import { LogoutService } from "@/features/(auth)/logout";
import { isPlatformServer } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  output,
  PLATFORM_ID,
  signal,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { WA_IS_MOBILE } from "@ng-web-apis/platform";
import { TuiDropdownSheet } from "@taiga-ui/addon-mobile";
import { TuiActiveZone } from "@taiga-ui/cdk";
import { TuiDataList, TuiDropdown, TuiTitle } from "@taiga-ui/core";
import { TuiAvatar, TuiFade } from "@taiga-ui/kit";
import { AppHeaderDrawerComponent } from "../drawer";
import { AppHeaderLogoComponent } from "../logo";
import { AppHeaderNavigationComponent } from "../navigation";
import { AppHeaderNavigationItemComponent } from "../navigation/item";

@Component({
  selector: "sheet-spy",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    AppUserRoleBadgeComponent,
    RouterOutlet,
    SheetSpy,
    TuiActiveZone,
    TuiAvatar,
    TuiDataList,
    TuiDropdown,
    TuiDropdownSheet,
    TuiFade,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  protected readonly logoutService = inject(LogoutService);
  protected readonly currentUserResource = inject(CURRENT_USER_RESOURCE);
  protected readonly isMobile = inject(WA_IS_MOBILE);
  protected readonly platformId = inject(PLATFORM_ID);
  protected readonly isServer = computed(() =>
    isPlatformServer(this.platformId),
  );
  protected readonly userDropdownOpen = signal(false);
}
