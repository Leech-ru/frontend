import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TuiFade, TuiTabs } from "@taiga-ui/kit";

@Component({
  templateUrl: "tabs.html",
  styleUrl: "tabs.less",
  imports: [RouterLink, RouterLinkActive, TuiFade, TuiTabs],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminTabsComponent {}
