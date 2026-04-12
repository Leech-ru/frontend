import { AppHeaderComponent } from "@/widgets/header";
import { isPlatformServer } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  PLATFORM_ID,
} from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { TuiLoader } from "@taiga-ui/core";
import { TuiFade, TuiTabs } from "@taiga-ui/kit";
import { TuiBlockStatusComponent } from "@taiga-ui/layout";

@Component({
  templateUrl: "admin.html",
  styleUrl: "admin.less",
  imports: [
    AppHeaderComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    TuiBlockStatusComponent,
    TuiFade,
    TuiLoader,
    TuiTabs,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminLayoutComponent {
  protected readonly platform = inject(PLATFORM_ID);
  protected readonly isServer = computed(() => isPlatformServer(this.platform));
}
