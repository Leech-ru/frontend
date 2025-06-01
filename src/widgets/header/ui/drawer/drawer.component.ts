import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { Router } from "@angular/router";
import { TuiButton, TuiDataList, TuiPopup, TuiTitle } from "@taiga-ui/core";
import { TuiDrawer } from "@taiga-ui/kit";
import { TuiHeader } from "@taiga-ui/layout";

import { NAVIGATION_ITEMS } from "../../config/navigation.config";
import { AppHeaderLogoComponent } from "../logo/logo.component";
import { AppHeaderDrawerLinkComponent } from "./link/link.component";

@Component({
  selector: "app-header-drawer",
  templateUrl: "drawer.component.html",
  styleUrl: "drawer.component.less",
  imports: [
    AppHeaderDrawerLinkComponent,
    AppHeaderLogoComponent,
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

  public constructor() {
    this.router.events.subscribe(() => {
      this.open.set(false);
    });
  }
}
