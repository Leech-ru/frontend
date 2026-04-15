import { CURRENT_USER_RESOURCE } from "@/entities/user";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import {
  TuiAppearance,
  TuiButton,
  TuiDataList,
  TuiPopup,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiDrawer } from "@taiga-ui/kit";
import { TuiHeader } from "@taiga-ui/layout";
import { NAVIGATION_ITEMS } from "../../config/navigation.config";

@Component({
  selector: "app-header-drawer",
  templateUrl: "drawer.html",
  styleUrl: "drawer.less",
  imports: [
    RouterLink,
    RouterLinkActive,
    TuiAppearance,
    TuiButton,
    TuiDataList,
    TuiDrawer,
    TuiHeader,
    TuiPopup,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderDrawerComponent {
  protected readonly router = inject(Router);
  protected readonly items = NAVIGATION_ITEMS;
  protected readonly open = signal(false);
  protected readonly currentUserResource = inject(CURRENT_USER_RESOURCE);

  protected readonly navigationItems = computed(() =>
    this.items.filter((item) => item.section === "navigation"),
  );

  protected readonly adminItems = computed(() =>
    this.items.filter((item) => item.section === "admin"),
  );

  protected readonly hasAdminAccess = computed(() => {
    const currentUser = this.currentUserResource.value();
    return currentUser && currentUser.role > 0;
  });

  public constructor() {
    this.router.events.subscribe(() => {
      this.open.set(false);
    });
  }
}
