import { USER_RESOURCE } from "@/entities/user";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import {
  TuiAppearance,
  TuiButton,
  TuiDataList,
  TuiPopup,
} from "@taiga-ui/core";
import { TuiDrawer } from "@taiga-ui/kit";
import { NAVIGATION_ITEMS } from "../../config/navigation.config";

@Component({
  selector: "app-header-drawer",
  templateUrl: "drawer.html",
  styleUrl: "drawer.less",
  imports: [
    RouterLink,
    RouterLinkActive,
    TuiButton,
    TuiAppearance,
    TuiDataList,
    TuiDrawer,
    TuiPopup,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderDrawerComponent {
  protected readonly router = inject(Router);
  protected readonly items = NAVIGATION_ITEMS;
  protected readonly open = signal(false);
  protected readonly userResource = inject(USER_RESOURCE);

  public constructor() {
    this.router.events.subscribe(() => {
      this.open.set(false);
    });
  }
}
