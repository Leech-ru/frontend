import { AppFooterComponent } from "@/widgets/footer";
import { AppHeaderComponent } from "@/widgets/header";
import { isPlatformServer } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  PLATFORM_ID,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TUI_BREAKPOINT, TuiLoader } from "@taiga-ui/core";
import { TuiBlockStatus } from "@taiga-ui/layout";
import { RouterDataService } from "./data";

@Component({
  templateUrl: "base.html",
  styleUrl: "base.less",
  imports: [
    AppFooterComponent,
    AppHeaderComponent,
    RouterOutlet,
    TuiBlockStatus,
    TuiLoader,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBaseLayoutComponent {
  protected readonly breakpoint = inject(TUI_BREAKPOINT);

  protected readonly platformId = inject(PLATFORM_ID);
  protected readonly isServer = computed(() =>
    isPlatformServer(this.platformId),
  );

  protected readonly data = inject(RouterDataService);

  protected readonly showHeader = this.data.get("showHeader", true);
  protected readonly showFooter = this.data.get("showFooter", true);
  protected readonly showHeaderMobile = this.data.get("showHeaderMobile", true);
  protected readonly showFooterMobile = this.data.get("showFooterMobile", true);
  protected readonly showServerLoading = this.data.get(
    "showServerLoading",
    false,
  );

  protected readonly isHeaderVisible = computed(() =>
    this.breakpoint() === "mobile"
      ? this.showHeader() && this.showHeaderMobile()
      : this.showHeader(),
  );

  protected readonly isFooterVisible = computed(() =>
    this.breakpoint() === "mobile"
      ? this.showFooter() && this.showFooterMobile()
      : this.showFooter(),
  );

  protected readonly isFullWidth = computed(
    () => !this.isHeaderVisible() && !this.isFooterVisible(),
  );
}
