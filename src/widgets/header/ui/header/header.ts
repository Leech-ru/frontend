import {
  AppUserRoleBadgeComponent,
  CURRENT_USER_RESOURCE,
} from "@/entities/user";
import { LogoutService } from "@/features/(auth)/logout";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  LOCALE_ID,
  OnDestroy,
  output,
  signal,
} from "@angular/core";
import { Router, RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { WA_IS_MOBILE } from "@ng-web-apis/platform";
import { TuiDropdownSheet } from "@taiga-ui/addon-mobile";
import { TuiActiveZone } from "@taiga-ui/cdk";
import {
  TuiAppearance,
  TuiButton,
  TuiDataList,
  TuiDropdown,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiCountryIsoCode } from "@taiga-ui/i18n";
import {
  TuiAvatar,
  TuiFade,
  TuiFlagPipe,
  TuiInitialsPipe,
} from "@taiga-ui/kit";
import { AppHeaderDrawerComponent } from "../drawer";
import { AppHeaderLogoComponent } from "../logo";
import { AppHeaderNavigationComponent } from "../navigation";

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
    AppUserRoleBadgeComponent,
    RouterLinkWithHref,
    RouterOutlet,
    SheetSpy,
    TuiActiveZone,
    TuiAppearance,
    TuiAvatar,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiDropdownSheet,
    TuiFade,
    TuiFlagPipe,
    TuiInitialsPipe,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  protected readonly router = inject(Router);
  protected readonly locale = inject(LOCALE_ID);
  protected readonly logoutService = inject(LogoutService);
  protected readonly currentUserResource = inject(CURRENT_USER_RESOURCE);
  protected readonly isMobile = inject(WA_IS_MOBILE);
  protected readonly languages = [
    { flag: "RU" satisfies TuiCountryIsoCode, name: "Русский", code: "ru" },
    { flag: "GB" satisfies TuiCountryIsoCode, name: "English", code: "en" },
  ];
  protected readonly langDropdownOpen = signal(false);
  protected readonly userDropdownOpen = signal(false);

  protected getLanguagePath(code: string): string {
    const path = this.router.url.replace(/^\/(?:ru|en)\/?/, "");
    return `/${code}${path}`;
  }

  protected isCurrentLanguage(code: string): boolean {
    return this.locale === code;
  }
}
